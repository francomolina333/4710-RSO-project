var reg = require('./register');
var express = require('express');
var app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'iLoveVu',
    database: 'rso3'
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
        return res.status(500).send('Error checking for email');
    }

    if (results.length > 0) {
        // Email already exists in the database, return an error
        console.log('Email already exists');
        return res.status(400).send('Email already exists');
    }

    const query = `INSERT INTO users (userlevel, password, email) VALUES (?, ?, ?)`;
    connection.query(query, [userlevel, password, email], (err, results, fields) => {
        if (err) {
            console.error('Error registering user: ' + err.stack);
            return res.status(500).send('Error registering user');
        }

        console.log('User registered');
        res.send('User registered successfully');
    });
});
});


app.get('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password are valid
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        res.send('Login successful!');
      } else {
        res.send('Invalid email or password');
      }
    });
});
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
            const q = `UPDATE uniprofile SET num_students = num_students + 1 WHERE uniid = ?`;
            connection.query(q, [uniid], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Failed to update num_students');
                } else {
                    console.log(`Updated num_students for uni ${uniid}`);
                    //res.status(409).send(`Updated num_students for uni ${uniid}`);
                }
            });
        }
    });

    //Handle non-MySQL errors
    process.on('uncaughtException', (err) => {
        console.error(`Caught exception: ${err}`);
        res.status(500).send(`Caught exception: ${err}`);
    });
});

// app.get('/loadUni', (req, res) => {
//     const { uniid } = req.body;
//     connection.query('SELECT * FROM uniprofile WHERE uniid = ?', [uniid], (error, results, fields) => {
//         if (error) {
//             res.status(500).send('Internal Server Error');
//         } else if (results.length === 0) {
//             res.status(404).send('University not found');
//         } else {
//             const uniProfile = results[0];
//             res.status(200).json({
//                 uniid: uniProfile.uniid,
//                 name: uniProfile.name,
//                 location: uniProfile.location,
//                 ranking: uniProfile.ranking,
//                 // Add any other attributes you want to return here
//             });
//         }
//     });
// });




// app.get('/createUniProfile', (req, res) => {});
// app.get('/login', (req, res) => {});
// app.get('/login', (req, res) => {});
// app.get('/login', (req, res) => {});
// app.get('/login', (req, res) => {});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})