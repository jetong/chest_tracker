var express = require('express');
var app = express();
var fs = require('fs');
var getJSON = require('get-json');

app.use('/', express.static('public'));


app.use('/handleForm', (req, res) => {
  fs.readFile('private/.api_key', function (err, key) {
    if (err) {
      console.log(err);
    }
    getId(key);
  });

  function getId(key) {
    var url_id = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/mycon/?api_key=" + key;
    getJSON(url_id, function(error, response) {
        var id = String(response.id);
  			getChests(id,key);
    });
  }

  function getChests(id,key) {
    var url_chests = "https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/" + id + "?api_key=" + key;
    getJSON(url_chests, function(error, response) {
      //	chest = String(response.chestGranted);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(JSON.stringify(response));
      res.end();
    });
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
