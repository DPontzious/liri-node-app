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
function moviesArr() {
    if (userInput.trim().length === 0) {
        var defaultMovie = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
        axios.get(defaultMovie).then(
            function (response) {
                console.log("Title: " + response.data.Title)
                console.log("Year Released: " + response.data.Released)
                console.log("IMDB Rating: " + response.data.imdbRating)
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("Country Movie was Produced In: " + response.data.Country)
                console.log("Language: " + response.data.Language); console.log("Plot:" + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
            })
    }
    else {
        var queryUrlMovie = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
        // console.log(queryUrl)
        axios.get(queryUrlMovie).then(
            function (response) {
                // console.log(response)
                console.log("Title: " + response.data.Title)
                console.log("Year Released: " + response.data.Released)
                console.log("IMDB Rating; " + response.data.imdbRating)
                console.log("Rotten Tomatoes Rating " + response.data.Ratings[1].Value)
                console.log("Country Movie was Produced In: " + response.data.Country)
                console.log("Language: " + response.data.Language); console.log("Plot:" + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
                // .catch(function (err) {
                //     console.log(err);
            })
    }
}
function concertArr() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
        function (response) {
            response.data.forEach(function (event) {
                // var concertArr = (event.venue.name, event.venue.city, moment(event.datetime).format("MM/DD/YYYY"));
                console.log(event.venue.name);
                console.log(event.venue.city);
                console.log(moment(event.datetime).format("MM/DD/YYYY"));
            })
        })
}
function spotifyArr(command) {
    if (userInput.trim().length === 0 && !command) {
        spotify
            .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
            .then(function (response) {
                // var spotifyArr = response1.album.arists[0].name;
                console.log(response.album.arists[0].name);
                console.log(response.album.name)
                console.log(response.name)
                console.log(response.preview.url)
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
}
function thisRandom() {
    fs.readFile("./random.txt", "utf8", (err, data) => {
        if (err) throw err;
        // console.log(data)
        var random = data;
        var lookFor = "spotify-this-song";
        var found = random.match(lookFor);
        spotifyArr(data);
    }
        // console.log(found);
        // }
    )
}

