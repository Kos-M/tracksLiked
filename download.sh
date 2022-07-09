#!/bin/bash

# pip install youtube-dl
# install ffmpeg ->    apt-get install ffmpeg 
#
source .env
videoID="$1"
error='no'
current_dir=$(pwd)
YOUTUBE_DL=$(which yt-dlp)

# exit -1
set -Eeuo pipefail
trap 'catch $? $LINENO' ERR
trap 'interrupted' INT

function checkDependencies(){
    if  [ ! -x "$(command -v  pwgen )" ]; then
            echo 'pwgen not installed , Abort'
            exit
    fi
    if  [ ! -x "$(command -v  yt-dlp )" ]; then
            echo 'yt-dlp not installed , checking for youtube-dl..'
            if  [ -x "$(command -v  youtube-dl )" ]; then
                YOUTUBE_DL=$(which  youtube-dl)
                echo "Found  youtube-dl in $YOUTUBE_DL "
                return
            fi
            echo 'yt-dlp and youtube-dl are not installed , install one of them to continue.. (Recommended yt-dlp)'
            echo 'pip install youtube-dl'
            echo 'python3 -m pip install -U yt-dlp'
            exit
    fi    
}

checkDependencies

temp=`pwgen  10 1`
dest="./$temp"
mkdir -p  $dest
cd $dest

interrupted(){
    if [ -d "$current_dir/$dest" ]; then 
        rm -r --  "$current_dir/$dest" 
    fi    
    exit -1
}
catch() { # foe cleaning on interrupt or error
  if [ "$1" != "0" ]; then
    # error handling goes here
    echo  "Line: $(caller) failed command:  ${BASH_COMMAND} "
     if [ -d "$current_dir/$dest" ]; then 
         rm -r --  "$current_dir/$dest" 
    fi
    exit
  fi
}
# --ignore-errors
"$YOUTUBE_DL"  --prefer-ffmpeg -f 'bestaudio' \
 --yes-playlist  -x --audio-format mp3  --embed-thumbnail --geo-bypass  --abort-on-error \
 --audio-quality 0 -o "%(title)s.%(ext)s"  \
 --add-metadata --postprocessor-args "-id3v2_version 3"  "$videoID"
last=$?
if [  "$last" -lt 0 ]; then 
    error='yes'
    echo 'error detected'
fi
mv ./*.mp3 "$trackDir"
cd ..
rm -r $temp || true
if [ "$error" == 'yes' ] ; then
    exit -1
fi
exit 0