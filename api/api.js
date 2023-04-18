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
      return res.status(200).json(ret);
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

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    var error = '';

    // Check if the email and password are valid
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results, fields) => {
      if (err) {
        error = err.sqlMessage;
      }
      else if (results.length > 0) {
        error = '';
      } else {
        error = "User not found";
      }
      var ret = {userid: results[0].userid, error:error};
      res.status(200).json(ret);
    });
})

app.post('/createUni', (req, res) => {
  const { name, description, address, userlevel } = req.body;

  if (userlevel !== "superadmin") {
    res.status(401).send('You are not authorized to access this resource');
    return;
  }

  const uniQuery = `SELECT * FROM uniprofile WHERE name = ?`;

  connection.query(uniQuery, [name], (err, results, fields) => {
    if (err) {
      console.error('Error checking for uni: ' + err.stack);
      res.status(500).send('Error checking for uni');
      return;
    }

    if (results.length > 0) {
      res.status(409).send('Uni already exists');
      return;
    }

    const insertQuery = `INSERT INTO uniprofile (name, description, address, num_students) VALUES (?, ?, ?, ?)`;

    connection.query(insertQuery, [name, description, address, 0], (err, results, fields) => {
      if (err) {
        console.error('Error creating uni: ' + err.stack);
        res.status(500).send('Error creating uni');
        return;
      }

      res.status(201).send('Uni created successfully');
    });
  });
});

app.put('/joinUni', (req, res) => {
  const { uniid, userid } = req.body;

  // Construct the SQL statement to update the user's email
  const sql = `UPDATE users SET uniid = ? WHERE userid = ?`;

  // Execute the SQL statement with the provided parameters
  connection.query(sql, [uniid, userid], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to update uniid');
      } else {
        console.log(`Updated uni for user ${userid} to ${uniid}`);
        res.send(`Updated uni for user ${userid} to ${uniid}`);
      }
    });
    
});


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