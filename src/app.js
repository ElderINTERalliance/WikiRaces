// Express Js, for Server hosting
const express = require('express');
const app = express();
const path = require('path');

// Bunyan, for logging
const bunyan = require('bunyan');
const bunyanOpts = {
   name: 'WikiRaces',
   streams: [
      {
         level: 'debug',
         stream: process.stdout
      },
      {
         level: 'info',
         path: '/var/tmp/WikiRaces.json'
      }
   ]
};
const log = bunyan.createLogger(bunyanOpts);

// Custom functions for generating Wikipedia pages
const dynamic = require('./game/dynamic');

log.info("Server Started");

// Start Server Code: ---------------

// dynamically generate urls
app.get('/wiki/:id', async (req, res) => {
   const start = new Date();
   const page = await dynamic.getPage(req.params.id);
   res.send(page);
   const end = new Date();
   const seconds = (end.getTime() - start.getTime()) / 1000;
   log.info(`Received ${req.params.id} in ${seconds} seconds.`);
});

// include static game files
app.use('/', express.static(__dirname + '/game/game_static'));

app.get('/', function (req, res) {
   // Send index.html
   res.sendFile(path.join(__dirname + '/game/index.html'));
});

// Other routes here
app.get('*', function (req, res) {
   res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);
