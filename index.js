const LikedDiscover = require('./src')

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
var TOKEN_DIR = '.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

 


( async function (parameters) {
   
    const agent = new LikedDiscover({TOKEN_PATH,TOKEN_DIR ,SCOPES})
   await agent.getLiked().then(async()=>{
       await agent.downloadNewTracks()

   })
})(arguments);
