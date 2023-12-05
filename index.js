const express = require('express');
const app = express();
const port = 1337;
const sqlite3 = require('sqlite3');

app.use(express.json());

const db = new sqlite3.Database('./movies.db');

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');

  // respond with html
  // res.setHeader('Content-Type', 'text/html');
  // res.send('<h1>Hello, this is your Express server!</h1>');
});

app.get('/movies', (req, res) => {
  const query = 'SELECT * FROM movies';

  db.all(query, [], (err, movies) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(movies);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


