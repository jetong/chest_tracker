// Todo: 
// Write backend script to update mongo.
// Write frontend javascript to query mongo, enable querying multiple usernames
// For each username, add list of champions for which chests have already been earned
// Saving to db overwrites existing data
// Improve err msg display format
// Limit RIOT api calls

// 3rd party dependencies
var express = require('express');
var fs = require('fs');
var getJSON = require('get-json');
var bodyParser = require('body-parser');

// Application modules
var User = require('./user.js');	// Mongoose schema class

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

      User.findOne( { username: username }, (err, user) => {
        if(err) {
          res.type("html").status(500);
          res.send("Error: " + err);
        } else if (!user) {
          // save new user into database
          newUser.save((err) => {
            if(err) {
              res.type('html').status(500);
              res.send('Error: ' + err);
            } else {
              res.render('userInfo', {user: newUser});
              res.end();
            }
          });
        } else {
          user.days = newUser.days;
          user.hours = newUser.hours;
          user.minutes = newUser.minutes;
          user.timestamp = newUser.timestamp;
          user.totalChests = newUser.totalChests;
          user.availableChests = newUser.availableChests;
          user.save((err) => {
            if(err) {
              res.type('html').status(500);
              res.send('Error: ' + err);
            } else {
              res.render('userInfo', {user: newUser});
              res.end();
            }
          });
        }
      }); // findOne()

    }); // getJSON()
  } // getChests()

}); // app.use handleform

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
