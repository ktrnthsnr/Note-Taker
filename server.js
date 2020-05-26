// -- Dependencies, requires
const express = require('express');
// -- connect to the JSON data -- //
const { notes } = require('./db/db');
const path = require('path');

// -- Instantiate an Express server & set port
const app = express();
// -- Heroku requires port 80, set the environment variable process.env.PORT
const PORT = process.env.PORT || 3002;
// const PORT = 3002;

// -- Sets Express app for data parsing when needed
app.use(express.urlencoded({ extended: true }));
// -- serve JSON files in a directory called db
app.use(express.json('db'));
// -- serve other static files in a directory called public
app.use(express.static('public'))
app.use('/notes', express.static(path.join(__dirname, 'public')))

// -- Data 

    // --> to do:  connect to the JSON array



// -- Routes, add a route (before listener) -- //

  // -- Home route to index.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  // -- Notes route to index.html
  app.get('/notes', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  // app.get('/notes', (req,res) => {
  //   console.log(__dirname);
  //   res.sendFile(path.join(__dirname, 'notes.html'));
  // });


  // -- JSON test route
  app.get('/api/db', (req, res) => {
      // -- quick test
        // res.send('Hello!');
      // -- respond with JSON data
      res.json(notes);
    });





// -- Listener, located at the end of the file; listens for requests; listen() method of the server or app object
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
  

// -- How to test and run step by step:
// -----------------------------------------
// -- 1. to start, run $ npm start
// -- successful response: (API server now on port 3002!) in the console.
// -- 2. after adding route, start again
// -- successful response here: http://localhost:3002/api/db 
// -- 3. after adding JSON route, start again
// -- successful response here: http://localhost:3002/api/db 

