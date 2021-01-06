var express = require('express');
var app = express();
var path = require('path');

// include static game files
app.use('/', express.static(__dirname + '/game/game_static'));

app.get('/', function(req, res){
   // res.send("This is a test");
   res.sendFile(path.join(__dirname + '/game/index.html'));
});

app.listen(3000);

console.log("Started");
