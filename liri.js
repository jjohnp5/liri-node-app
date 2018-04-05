require('dotenv').config();
var request = require('request');
var fs = require('fs');

// var spotify = new spotify(keys.spotify);
// var client = new twitter(keys.twitter);
var defaultRandomSong = ""

fs.readFile('random.txt',(err, data)=>{
    if(err) throw err;
    console.log(data.toString('utf8').replace(/"/g, '').split(','));
})



