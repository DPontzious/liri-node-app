require("dotenv").config();
var keys = require("./keys.js");
const fs = require("fs")
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const axios = require("axios");
let userInput = process.argv.slice(3).join("+");
let searchParm = process.argv[2];
// fs.writeFile("data.txt", "What I did", "utf8", (err, data) => {
// if (err) throw err;
switch (searchParm) {
    case "concert-this":
        concertArr();
        break;
    case "spotify-this-song":
        spotifyArr();
        break;
    case "movie-this":
        moviesArr();
        break;
    case "do-what-it-says":
        thisRandom();
        break;
}
function moviesArr(command1) {
    if (userInput.trim().length === 0 && !command1) {
        var defaultMovie = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
        axios.get(defaultMovie).then(
            function (response) {
                console.log("Title: " + response.data.Title)
                console.log("Year Released: " + response.data.Released)
                console.log("IMDB Rating: " + response.data.imdbRating)
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("Country Movie was Produced In: " + response.data.Country)
                console.log("Language: " + response.data.Language);
                console.log("Plot:" + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
                // fs.appendFile('message.txt', response.data.Title, 'utf8', (err, data) => {
                // if (err) throw err;
                // }             
            })
    }
    else {
        var movie = '';
        if (userInput.trim().length > 0) {
            movie = userInput;
        } else if (command1) {
            movie = command1.split(',')[1];
        }
        var queryUrlMovie = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrlMovie)
        axios.get(queryUrlMovie).then(
            function (response) {
                // console.log(response)
                console.log("Title: " + response.data.Title)
                console.log("Year Released: " + response.data.Released)
                console.log("IMDB Rating; " + response.data.imdbRating)
                console.log("Rotten Tomatoes Rating " + response.data.Ratings.Value)
                console.log("Country Movie was Produced In: " + response.data.Country)
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
                // fs.appendFile('message.txt', response.data.Title, 'utf8', callback);

                // .catch(function (err) {
                //     console.log(err);
            })
    }
}
function concertArr(command2) {
    // if (userInput.trim().length === 0 && !command2)
    var concert = '';
    if (userInput.trim().length > 0) {
        concert = userInput;
    } else if (command2) {
        concert = command2.split(',')[1];
    }
    var queryUrlConcert = "https://rest.bandsintown.com/artists/" + concert.replace(" ", "") + "/events?app_id=codingbootcamp"
    // console.log("concert", concert);
    // console.log(queryUrlConcert)
    axios.get(queryUrlConcert).then(
        function (response) {
            // console.log('response.data', response.data)
            response.data.forEach(function (event) {
                // var concertArr = (event.venue.name, event.venue.city, moment(event.datetime).format("MM/DD/YYYY"));
                console.log(event.venue.name);
                console.log(event.venue.city);
                console.log(moment(event.datetime).format("MM/DD/YYYY"));
            })
        })
}
function spotifyArr(command) {
    if ((!userInput.trim().length || userInput.trim().length === 0) && !command) {
        // console.log(userInput)
        spotify
            .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
            .then(function (response) {
                // console.log('rsponse', response);
                console.log(response.artists[0].name);
                console.log(response.artists[0].href);
                console.log(response.name)
                console.log(response.album.name)
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    else {
        var song = '';
        if (userInput.trim().length > 0) {
            song = userInput;
        } else if (command) {
            song = command.split(',')[1];
        }
        // console.log('song title', song);
        spotify
            .search({ type: 'track', query: song, limit: 1 })
            .then(function (response) {
                // console.log('rs', response)
                console.log(response.tracks.items[0].artists[0].name);
                console.log(response.tracks.items[0].name);
                console.log(response.tracks.items[0].album.name);
                console.log(response.tracks.items[0].preview_url);
            })
            .catch(function (err) {
                console.log(err);
                // console.log(JSON.stringify(response, null, 2));
                // fs.writeFile("spotify-data.json", JSON.stringify(response, null, 2), function (err) {
            })
    }
    // )
    // }
}
function thisRandom() {
    fs.readFile("./random.txt", "utf8", (err, data) => {
        if (err) throw err;
        // console.log(data)
        var random = data;
        // var lookFor = "spotify-this-song";
        // var lookForMovie = "movie-this";
        // var found = random.match(lookFor);
        // var foundMovie = random.match(lookForMovie);
        // console.log(found, foundMovie);
        if (random.match("spotify-this-song")) {
            spotifyArr(data);
        } else if (random.match("movie-this")) {
            moviesArr(data);
        } else if (random.match("concert-this")) {
            concertArr(data)
        } else {
            return
        }
        // if (found) {
        //     // console.log('spotify');

        // }
        // else if (foundMovie) {
        //     // console.log("foundMovie")

        // }
        // else if () 
        // e{
        //     return;
        // }
        // console.log(found);
        // }
    }
    )
}

