require('dotenv').config();
var request = require('request');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');
var inquire = require('inquirer');

var spotifyBaseURL = "https://api.spotify.com/"

var spotify = new Spotify(keys.spotify);
// var client = new twitter(keys.twitter);

var Twitter = new Twitter(keys.twitter);
const command = process.argv.reduce((acc, d, i)=>{
    let firstCommand = "";
    if(i < 2) {
        let str = d.replace(/[\\]/g, '&');
        firstCommand = str.substring(str.lastIndexOf('&')+1);
        return acc + " " +firstCommand;
}
    return acc + " " + d;
})
fs.appendFile('log.txt', `${command}\n`, (err)=>{
    if(err) throw err;
    console.log("Command appended to file.")
})
console.log(command);
switch (process.argv[2]) {
    case ("my-tweets"):
        if (!process.argv[3]) {
            Twitter.get('/statuses/user_timeline', { screen_name: "jjohnp5" }, function (d, e, f) {
                // console.log(d);
                if (d) {
                    console.log(d)
                } else {
                    e.forEach((tweet, i) => {
                        if (i < 11) {
                            console.log(tweet.text)
                            fs.appendFile('log.txt', `${tweet.text}\n`, (err)=>{
                                if(err) throw err;
                            })
                        }

                    })
                    
                }
            })
        } else {
            Twitter.get('/statuses/user_timeline', { screen_name: process.argv[3] }, function (d, e, f) {
                // console.log(d);
                if (d) {
                    console.log(d)
                } else {
                    e.forEach((tweet, i) => {
                        if (i < 11) {
                            console.log(tweet.text)
                            fs.appendFile('log.txt', `${tweet.text}\n`, (err)=>{
                                if(err) throw err;
                            })
                        }

                    })
                }
            })
        }

        break;
    case ("spotify-this-song"):
        if (!process.argv[3]) {
            fs.readFile('random.txt', (err, fd) => {
                if (err) {
                    console.log(err);
                } else {
                    let baseRandSongs = fd.toString().replace(/"/g, '').split(',');
                    let randomIndex = Math.floor(Math.random() * baseRandSongs.length);
                    console.log(baseRandSongs[randomIndex]);
                    spotify.search({ query: baseRandSongs[randomIndex], type: 'track', limit: 10 }).then(d => {
                        
                        console.log(d.tracks.items[0]);
                        let arts = [];
                        d.tracks.items.forEach(spot => {
                            arts.push(spot.artists[0].name);
                        });
                        inquire.prompt([
                            {
                                type: 'list',
                                message: 'Choose an artist',
                                choices:arts,
                                name: 'artist'
                            }
                        ]).then(res => {
                            for(let i = 0; i < d.tracks.items.length; i++){
                                if(d.tracks.items[i].artists[0].name === res.artist){
                                    let s = d.tracks.items[i];
                                    console.log(s.artists[0].name, " - " + s.name, "\nurl: " + s.external_urls.spotify, "\nAlbum: " + s.album.name);
                                    fs.appendFile('log.txt', s.artists[0].name + " - " + s.name + "\nurl: " + s.external_urls.spotify + "\nAlbum: " + s.album.name+"\n", (err)=>{
                                        if(err) throw err;
                                    })
                                    i = d.tracks.items.length;
                                }
                            }
                        })
                    }).catch(err => {
                        console.log(err);
                    })

                }
            })
        } else {
            let q = process.argv.filter((data, i) => {
                return i > 2;
            })
            console.log(q);
            let que = q.reduce((acc, d) => {
                return acc + " " + d;
            })
            console.log(que);
            spotify.search({ query: que, type: 'track', limit: 10 }).then(d => {
                console.log(d.tracks.items[0]);
                        let arts = [];
                        d.tracks.items.forEach(spot => {
                            arts.push(spot.artists[0].name);
                        });
                        inquire.prompt([
                            {
                                type: 'list',
                                message: 'Choose an artist',
                                choices:arts,
                                name: 'artist'
                            }
                        ]).then(res => {
                            for(let i = 0; i < d.tracks.items.length; i++){
                                if(d.tracks.items[i].artists[0].name === res.artist){
                                    let s = d.tracks.items[i];
                                    console.log(s.artists[0].name, " - " + s.name, "\nurl: " + s.external_urls.spotify, "\nAlbum: " + s.album.name);
                                    fs.appendFile('log.txt', s.artists[0].name + " - " + s.name + "\nurl: " + s.external_urls.spotify + "\nAlbum: " + s.album.name+"\n", (err)=>{
                                        if(err) throw err;
                                    })
                                    i = d.tracks.items.length;
                                }
                            }
                        })
            }).catch(err => {
                console.log(err);
            })
        }
        break;
    case ("movie-this"):
        if (!process.argv[3]) {
            request(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=Mr.+Nobody`, function(err, res, body){
                let rTomatoes;
                let response = JSON.parse(body);
                response.Ratings.forEach((d,i)=>{
                    if(d.Source === "Rotten Tomatoes") rTomatoes = d.Value;
                })
                console.log(`
Title: ${response.Title}
Year: ${response.Year}
IMDB Rating: ${response.imdbRating}
Rotten Tomatoes: ${rTomatoes}
Country: ${response.Country}
Language: ${response.Language}
Plot: ${response.Plot}
Actors: ${response.Actors}

                `);
            })
        }else{
            let q = process.argv.filter((data, i) => {
                return i > 2;
            })
            console.log(q);
            let que = q.reduce((acc, d) => {
                return acc + "+" + d;
            })
            request(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${que}`, function(err, res, body){
                let rTomatoes;
                let response = JSON.parse(body);
                response.Ratings.forEach((d,i)=>{
                    if(d.Source === "Rotten Tomatoes") rTomatoes = d.Value;
                })
                console.log(`
Title: ${response.Title}
Year: ${response.Year}
IMDB Rating: ${response.imdbRating}
Rotten Tomatoes: ${rTomatoes}
Country: ${response.Country}
Language: ${response.Language}
Plot: ${response.Plot}
Actors: ${response.Actors}

                `);
            })
        }

}

