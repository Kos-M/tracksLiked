const fs = require('fs');
const path = require('path')
const readline = require('readline');
const { google } = require('googleapis');
const child_process = require('child_process')
require('dotenv').config()
const OAuth2 = google.auth.OAuth2;
const moment = require("moment");
const ms = require('ms')

class LikedDiscover {

    constructor({ TOKEN_DIR, TOKEN_PATH, SCOPES }) {
        this.TOKEN_DIR = TOKEN_DIR
        this.TOKEN_PATH = TOKEN_PATH
        this.SCOPES = SCOPES
        // this.downloaded = []
        this.lastNliked = []
        this.authorizationToken = null

        this.getLiked = this.getLiked.bind(this)
        this.init = this.init.bind(this)
        this.downloadNewTracks = this.downloadNewTracks.bind(this)

        this.init()
    }

    init() {
        if (!fs.existsSync('client_secret.json')) {
            throw new Error('client_secret.json not found , is requeired to authenticate!')
        }
        const data = fs.readFileSync('client_secret.json', { encoding: 'utf8', flag: 'r' });
        this.authorizationToken = JSON.parse(data)
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials, callback) {
        const clientSecret = credentials.installed.client_secret;
        const clientId = credentials.installed.client_id;
        const redirectUrl = credentials.installed.redirect_uris[0];
        const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
        const thisIS = this

        oauth2Client.on('tokens', (tokens) => {
            console.info('token event:');
            console.info(tokens);
            oauth2Client.credentials = tokens;
          });
        // Check if we have previously stored a token.
        fs.readFile(this.TOKEN_PATH, function (err, token) {
            if (err) {
                thisIS.getNewToken(oauth2Client, callback);
            } else {
                oauth2Client.credentials = JSON.parse(token);
                callback(oauth2Client);
            }
        });
    }
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized
     *     client.
     */
    getNewToken(oauth2Client, callback) {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        const thisIS = this
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function (code) {
            rl.close();
            oauth2Client.getToken(code, function (err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                thisIS.storeToken(token);
                callback(oauth2Client);
            });
        });
    }

    /**
     * Store token to disk be used in later program executions.
     *
     * @param {Object} token The token to store to disk.
     */
    storeToken(token) {
        try {
            fs.mkdirSync(this.TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) throw err;
            console.log('Token stored to ' + this.TOKEN_PATH);
        });
    }

    getLiked() {
        const thisIS = this
        return new Promise((resolve, reject) => {
            this.authorize(this.authorizationToken, async (auth) => {
                const service = google.youtube('v3');
                let nextPageToken_ = null;
                do {
                    const res = await service.playlistItems.list({
                        auth: auth,
                        part: 'snippet',
                        maxResults: 50,  // 50 is the max value
                        playlistId: "LL",
                        pageToken: nextPageToken_
                    })
                    let results = res.data.items;
                    nextPageToken_ = res.data.nextPageToken;
                    for (let resI = 0; resI < results.length; resI++) {
                        const item = results[resI];
                        const video = {
                            title: item.snippet.title,
                            id: item.snippet.resourceId.videoId
                        }
                        if (process.env.skip_tracks_over_duration) {
                            const vidResp = await service.videos.list({
                                auth,
                                id: video.id,
                                part: 'contentDetails'
                            })
                            const durationISO = vidResp.data.items[0]?.contentDetails?.duration
                            const momentDuration = moment.duration(durationISO);
                            if (momentDuration.asMilliseconds() > ms(process.env.skip_tracks_over_duration)) {
                                console.log(`> skipp [${video.id}] duration ${ms(momentDuration.asMilliseconds(), { long: true })}  ${video.title} , exceeds time limit from config.`)
                                continue
                            }
                        }
                        thisIS.lastNliked.push(video)
                    }


                } while (nextPageToken_ != null)
                // console.log(thisIS.lastNliked)    
                resolve()
            });

        })

    }
    downloadNewTracks() {
        // if (this.lastNliked.length === 0 ) return;
        if (!fs.existsSync('known.json')) {
            fs.writeFileSync('known.json', JSON.stringify({ completed: [] }, null, 4), () => { })
        }
        const knownDownloaded = JSON.parse(fs.readFileSync('known.json', { encoding: 'utf8' }))?.completed
        const pending = this.lastNliked.filter(video => !knownDownloaded.some(known => video.id === known.id))
        console.log(`known: ${knownDownloaded.length} pending: ${pending.length} likedTotal: ${this.lastNliked.length}`)
        for (let i = 0; i < pending.length; i++) {
            const video = pending[i];
            console.dir(video)
            if (fs.existsSync(path.join(process.env.trackDir, `${video.title}.mp3`))) { // check if track exist already
                console.log(`Skipping ${video.title} exist in ${process.env.trackDir}`)
                knownDownloaded.push(video)
                fs.writeFileSync('known.json', JSON.stringify({ completed: knownDownloaded }, null, 4), () => { })
                continue
            }
            try {
                child_process.execSync(`./download.sh ${video.id}`, {
                    shell: true,
                    cwd: process.cwd(),
                    env: process.env,
                    stdio: 'inherit',
                    encoding: 'utf-8'
                });
                knownDownloaded.push(video)
                fs.writeFileSync('known.json', JSON.stringify({ completed: knownDownloaded }, null, 4), () => { })
            } catch (e) {
                console.log('message ' + e.message)
            }
            console.log(`> TotalLiked: ${this.lastNliked.length} Pending : ${pending.length} Tracks From Playlist:${knownDownloaded.length}`)
        }
    }
}

module.exports = LikedDiscover