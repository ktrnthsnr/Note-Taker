// -- require Express.js
const express = require('express');
// -- connect to the JSON data -- //
const { notes } = require('./db/db');

// -- instantiate an Express server
const app = express();

// -- add a route (before listen) -- //
app.get('/api/db', (req, res) => {
    // -- quick test
      // res.send('Hello!');
    // -- respond with JSON data
    res.json(notes);
  });

// -- listen for requests, set the port, chain listen() method onto the server
app.listen(3002, () => {
    console.log(`API server now on port 3002!`);
  });
  

// -- How to test and run step by step:
// -----------------------------------------
// -- 1. to start, run $ npm start
// -- successful response: (API server now on port 3002!) in the console.
// -- 2. after adding route, start again
// -- successful response here: http://localhost:3002/api/db 
// -- 3. after adding JSON route, start again
// -- successful response here: http://localhost:3002/api/db 

