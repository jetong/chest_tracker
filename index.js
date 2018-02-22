// todo: 
// send data to mongoDB.  consider using cookies
// write backend script to update mongo, use GO?
// write frontend javascript to query mongo

var express = require('express');
var fs = require('fs');
var getJSON = require('get-json');
var bodyParser = require('body-parser');

var User = require('./user.js');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.use('/handleForm', (req, res) => {
  var username = req.body.username;
  var days = req.body.days;
  var hours = req.body.hours;
  var minutes = req.body.minutes;
  var available_chests = req.body.available_chests;

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
    var url_chests = "https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/" + id + "?api_key=" + key;
    getJSON(url_chests, function(error, champs) {
      // count the number of champions whose chestGranted is true
      var total_chests = 0;
      champs.forEach( (champ) => {
        if(champ.chestGranted == true) {
          total_chests++;
        }
      });

      var newUser = new User ({
        username: username,
        id: id,
        days: days,
        hours: hours,
        minutes: minutes,
        timestamp: Date.now(),
        total_chests: total_chests,
        available_chests: available_chests,
      });

			console.log(JSON.stringify(newUser));

      newUser.save( (err) => {
        if(err) {
          res.type('html').status(500);
          res.send('Error: ' + err);
        } else {
          res.render('userInfo', {user: newUser});
          res.end();
        }
      });

    }); // getJASON()
  } // getChests()

}); // app.use handleform

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
