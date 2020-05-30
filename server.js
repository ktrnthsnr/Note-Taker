// -- Dependencies, requires
const express = require('express');
// -- connect to the JSON data -- //
const { notes } = require('./db/db');
const path = require('path');
// required to POST
const fs = require('fs');

// -- Instantiate an Express server & set port
const app = express();
// -- Heroku requires port 80, set the environment variable process.env.PORT
const PORT = process.env.PORT || 3002;
// const PORT = 3002;

// -- import JSON into an array
  // const { notes } = require('./db/db.json'); 

// -- Sets Express app for data parsing when needed
app.use(express.urlencoded({ extended: true }));
// -- serve JSON files in a directory called db
app.use(express.json());
  // app.use(express.json('db'));

// -- add middleware so the index.html can access the CSS and script.js
app.use(express.static('public'))
// app.use('/notes', express.static(path.join(__dirname, 'public')))

// -- functions -- //

          // -- to do: add read file


          // -- to do: add write file


// -- to do: add a note

// -- Routes, add a route (before listener) -- //

//-- GET requests -- //
  // -- Home route to index.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  // -- Notes route to index.html
  app.get('/notes', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

  // app.get('/notes', (req,res) => {
  //   console.log(__dirname);
  //   res.sendFile(path.join(__dirname, 'notes.html'));
  // });


  // -- JSON test route
  app.get('/api/notes', (req, res) => {
      // -- quick test
        // res.send('Hello!');
      // -- respond with JSON data // todo: use fs read file instead of directly serving the file
      res.json(notes);
    });

// -- POST requests

          // app.post('/api/notes', (req, res) => {
          //   // req.body is where our incoming content will be
          //   const newNote = req.body;       
          //   console.log(req.json(notes));
          //   res.json(note);
          // });

          app.post('/api/notes', (req, res) => {
            // array 
             req.body.id = notes.length.toString();
            //validation
            if (!validateNotes(req.body)) {
              res.status(400).send('The note is not formed propertly. Ensure all fields are filled.');
            } else {
              const note = createNewNote(req.body, notes);
              res.json(note);
            }
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
// -- 4. Heroku site: https://ktrnthsn-notetaker.herokuapp.com/ 

