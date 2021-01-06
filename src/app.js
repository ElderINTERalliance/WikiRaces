var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
   // res.send("This is a test");
   res.sendFile(path.join(__dirname + '/game/index.html'));
});

app.listen(3000);

console.log("Started");
