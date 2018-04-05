require('dotenv').config();
var request = require('request');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');

var spotifyBaseURL = "https://api.spotify.com/"

var spotify = new Spotify(keys.spotify);
// var client = new twitter(keys.twitter);

var Twitter = new Twitter(keys.twitter);

switch(process.argv[2]){
    case("my-tweets"):
        if(!process.argv[3]){
            Twitter.get('/statuses/user_timeline', {screen_name : "jjohnp5"}, function(d, e, f){
                // console.log(d);
                if(d){
                    console.log(d)
                }else{
                    e.forEach((tweet, i) => {
                        if(i < 11){
                            console.log(tweet.text)
                        }
                        
                    })
                }
            })
        }else{
            Twitter.get('/statuses/user_timeline', {screen_name : process.argv[3]}, function(d, e, f){
                // console.log(d);
                if(d){
                    console.log(d)
                }else{
                    e.forEach((tweet, i) => {
                        if(i < 11){
                            console.log(tweet.text)
                        }
                        
                    })
                }
            })
        }
        
        break;
    case("spotify-this-song"):
        if(!process.argv[3]){
            fs.readFile('random.txt', (err, fd) => {
                if(err){
                    console.log(err);
                }else{
                    let baseRandSongs = fd.toString().replace(/"/g, '').split(',');
                    let randomIndex = Math.floor(Math.random()*baseRandSongs.length);
                    console.log(baseRandSongs[randomIndex]);
                    spotify.search({query: baseRandSongs[randomIndex], type: 'track', limit: 10}).then(d => {
                        let s = d.tracks.items[0];
                        console.log(d.tracks.items[0])
                        console.log(s.artists[0].name, " - "+s.name,"\nurl: "+s.external_urls.spotify, "\nAlbum: "+s.album.name);
                    }).catch(err =>{
                        console.log(err);
                    })
                    
                }
            })
        }else{
            let q = process.argv.filter((data, i)=>{
                return i > 2;
            })
            console.log(q);
            let que = q.reduce((acc, d)=>{
                return acc + " " + d;
            })
            console.log(que);
            spotify.search({query: que, type: 'track', limit: 10}).then(d => {
                let s = d.tracks.items[0];
                console.log(d.tracks.items[0])
                console.log(s.artists[0].name, " - "+s.name,"\nurl: "+s.external_urls.spotify, "\nAlbum: "+s.album.name);
            }).catch(err =>{
                console.log(err);
            })
        }
        break;
    case("movie-this"):
        if(!process.argv[3]){
}

}