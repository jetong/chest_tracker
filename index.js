// Todo: 
// Send data to mongoDB.  consider using cookies
// Write backend script to update mongo, use GO?
// Write frontend javascript to query mongo
// Add list of champions for which chests have already been earned

// Check:
// Validate user input
// Saving to db overwrites existing data
// Vertically align div in css
// Limit RIOT api calls

// 3rd party dependencies
var express = require('express');
var fs = require('fs');
var getJSON = require('get-json');
var bodyParser = require('body-parser');

// Application models
var User = require('./user.js');

// Initializations
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Routing
app.use('/', express.static('public'));
app.use('/handleForm', (req, res) => {
  var username = req.body.username;
  var days = req.body.days;
  var hours = req.body.hours;
  var minutes = req.body.minutes;
  var availableChests = req.body.availableChests;

  fs.readFile('private/.api_key', function (err, key) {
    if (err) {
      console.log(err);
    }
    getId(key);
  });

  // RIOT api call to retrieve id by username
  function getId(key) {
    var url_id = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + username + "/?api_key=" + key;
    getJSON(url_id, function(error, response) {
        var id = String(response.id);
  			getChests(id,key);
    });
  }

  // RIOT api call to retreive champion details by id
  function getChests(id,key) {
    var url_chests = "https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/" + 
      id + "?api_key=" + key;
    getJSON(url_chests, function(error, champs) {
      // count the number of champions whose chestGranted is true
      var totalChests = 0;
      champs.forEach( (champ) => {
        if(champ.chestGranted == true) {
          totalChests++;
        }
      });

      var newUser = new User ({
        username: username,
        id: id,
        days: days,
        hours: hours,
        minutes: minutes,
        timestamp: Date.now(),
        totalChests: totalChests,
        availableChests: availableChests,
      });

			console.log(JSON.stringify(newUser));

      newUser.save((err) => {
        if(err) {
          res.type('html').status(500);
          res.send('Error: ' + err);
        } else {
          res.render('userInfo', {user: newUser});
          res.end();
        }
      });

    }); // getJSON()
  } // getChests()

}); // app.use handleform

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
