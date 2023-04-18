var express = require('express');
var app = express();
const mysql = require('mysql');
const cors = require('cors');
const {v1: uuidv1, v4: uuidv4} = require('uuid');

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
app.use(cors());
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/register', (req, res) => {
    const { password, email } = req.body;

    var error = '';
    var newid = 0;

    // Do something with the name and email
    // here you write sql to CREATE this user in DB
    // could prob do this in dboperations.js
    // dboperations.registerUser().then(result => {
    //     res.send(`User ${email} created successfully`);
    // })

    const emailQuery = `SELECT * FROM users WHERE email = ?`;
    connection.query(emailQuery, [email], (err, results, fields) => {
    if (err) {
      var ret = {error:err.sqlMessage};
      res.status(200).json(ret);
    }
    if (results.length > 0) {
      // Email already exists in the database, return an error
      var ret = {error:"Email already exists"};
      res.status(200).json(ret);
    }

    const userlevel = "Student";
    const query = `INSERT INTO users (userid, userlevel, password, email) VALUES (?, ?, ?, ?)`;
    connection.query(query, [newid, userlevel, password, email], (err, results, fields) => {
        if (err) {
            error = err.sqlMessage;
        }

        //console.log('User registered with id ' + results.userid);
        //res.send('User registered successfully');

        var ret = {error:error};
        res.status(200).json(ret);
    });
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