var express = require('express');
var app = express();
var fs = require('fs');
var getJSON = require('get-json');

app.use('/', express.static('public'));

app.use('/handleForm', (req, res) => {
	var id, chest, key;
  fs.readFile('private/.api_key', function (err, data) {
		if (err) {
			console.log(err);
		}
		key = data;
		var url_id = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/mycon/?api_key=" + data;
		getJSON(url_id, function(error, response) {
			id = String(response.id);
console.log(id);
    	//res.write(JSON.stringify(response));
  	});
		var url_chests = "https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/" + id + "?api_key=" + data;
		getJSON(url_chests, function(error, response) {
		//	chest = String(response.chestGranted);
			res.writeHead(200, {'Content-Type': 'text/html'});
console.log(id);
			//res.write(id);
  res.end();
		});
	});
//  res.writeHead(200, { 'Content-Type': 'text/html' });
	//res.write(chest);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
