# smu-week-10-hw
# Homework for Week 10 SMU Coding Bootcamp

This homework is the start of NodeJS. Usage of `process.argv` is used on this homework. This is a full command line node app.

### Brief description:

Liri is a system that takes input from users through command line to make it do what users want to do. This app uses APIs of Twitter, Spotify and OMDB.

### Technologies used:

`Twitter API`  
`Spotify API`  
`OMDB API`  
`Inquirer package`  
`Request package`  
`Node File system package`  
`DotEnv`  

### How to use

Run package install command to install all dependencies of the application.
`npm install`

You will need your own .env file that stores your API Keys and Tokens.  
On your `.env` file, include the following format:
```
# Spotify API keys

SPOTIFY_ID=*Your API key*
SPOTIFY_SECRET=*Your API secret

# Twitter API keys

TWITTER_CONSUMER_KEY=*Your Api key*
TWITTER_CONSUMER_SECRET=*Your consumer secret*
TWITTER_ACCESS_TOKEN_KEY=*Your token key*
TWITTER_ACCESS_TOKEN_SECRET=*your token secret*


OMDB_API_KEY=*Your OMDB API Key*
```

Create a `keys.js` file that includes has this code inside it. No updates necessary to this code.
```
console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```



##### Commands available
`my-tweets`(defaults to jjohnp5)  
`spotify-this-song`(defaults to random song from random.txt)  
`movie-this`(defaults to Mr. Nobody)  

###### Sample commands:
`node liri.js my-tweets *your handle here*`  
`node liri.js my tweets oublerift`  
`node liri.js spotify-this-song 'my way'`  
`node liri.js spotify-this-song my way`(no quotes)  
`node liri.js movie-this 'iron man'`
`node liri.js movie-this iron man`(no quotes)