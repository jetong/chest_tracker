// todo: 
// send data to mongoDB.  consider using cookies
// write backend script to update mongo, use GO?
// write frontend javascript to query mongo

var express = require('express');
var app = express();

var fs = require('fs');
var getJSON = require('get-json');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.use('/handleForm', (req, res) => {
  var username = req.body.username;
  var days = req.body.days;
  var hours = req.body.hours;
  var minutes = req.body.minutes;
  var chests_available = req.body.chests_available;

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
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(username + " " + 
                      id + " " + 
                    days + " " + 
                   hours + " " + 
                 minutes + " " + 
              Date.now() + " " + 
            total_chests + " " + 
        chests_available
      );

      res.end();
    });
  }

});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
