var reg = require('./register');
var express = require('express');
var app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'iLoveVu',
    database: 'rso'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
})

app.use(express.json());

app.post('/register', (req, res) => {
    const { password, email, userlevel } = req.body

    // Do something with the name and email
    // here you write sql to CREATE this user in DB
    // could prob do this in dboperations.js
    // dboperations.registerUser().then(result => {
    //     res.send(`User ${email} created successfully`);
    // })
    const emailQuery = `SELECT * FROM users WHERE email = ?`;
    connection.query(emailQuery, [email], (err, results, fields) => {
        if (err) {
            console.error('Error checking for email: ' + err.stack);
            res.status(500).send('Error checking for email');
            return;
        }

        if (results.length > 0) {
            // Email already exists in the database, return an error
            res.status(409).send('Email already exists');
            return;
        }
    });
    const query = `INSERT INTO users (userlevel, password, email) VALUES (?, ?, ?)`;
    connection.query(query, [userlevel, password, email], (err, results, fields) => {
        if (err) {
            console.error('Error registering user: ' + err.stack);
            res.status(500).send('Error registering user');
            return;
        }

        console.log('User registered with id ' + results.userid);
        res.send('User registered successfully');
    });
    
});

app.get('/login', (req, res) => {
    const { email, password } = req.body;

    console.log(email);

    // Check if the email and password are valid
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      if (results.length > 0) {
        res.send('Login successful!');
      } else {
        res.send('Invalid email or password');
      }
    });
})
// app.get('/login', (req, res) => {});
// app.get('/login', (req, res) => {});
// app.get('/login', (req, res) => {});
// app.get('/login', (req, res) => {});
// app.get('/login', (req, res) => {});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})