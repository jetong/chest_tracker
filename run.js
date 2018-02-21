var express = require('express');
var app = express();

var interval = 60*1000*15;	// 15 mins
setInterval(update, interval);

function update() {
  console.log("hello!");
}

app.listen(3001, () => {
  console.log('Listening on port 3001');
})
