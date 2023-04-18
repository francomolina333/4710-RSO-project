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

app.get('/api/generateID', async (req, res) => {
  const { password, email } = req.body;

  var error = '';
  var newID;


  const query = `SELECT * FROM users`;
  connection.query(query, [], (err, results, fields) => {
      if (err) {
          error = err.sqlMessage;
      }

      newID = results.length + 1;
      console.log(newID);
      //console.log('User registered with id ' + results.userid);
      //res.send('User registered successfully');

      var ret = {error:error, newID:newID};
      res.status(200).json(ret);
  });
});

app.get('/api/generateRSOID', async (req, res) => {

  var error = '';
  var newID;


  const query = `SELECT * FROM rso`;
  connection.query(query, (err, results, fields) => {
      if (err) {
          error = err.sqlMessage;
      }

      newID = results.length + 1;
      console.log(newID);
      //console.log('User registered with id ' + results.userid);
      //res.send('User registered successfully');

      var ret = {error:error, newID:newID};
      res.status(200).json(ret);
  });
});


app.post('/api/register', async (req, res) => {
    const { newID, password, email } = req.body;

    var error = '';


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
      return;
    }

    const userlevel = "Student";
    const query = `INSERT INTO users (userid, userlevel, password, email) VALUES (?, ?, ?, ?)`;
    connection.query(query, [newID, userlevel, password, email], (err, results, fields) => {
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
        var userid = results[0].userid;
      } else {
        error = "User not found";
      }
      var ret = {userid:userid, error:error};
      res.status(200).json(ret);
    });
})

app.post('/api/createUni', (req, res) => {
  const { name, description, address, userlevel } = req.body;
  var error = '';
  var ret;
  if (userlevel !== "superadmin") {
   //res.status(401).send('You are not authorized to access this resource');

   error = "You are not authorized to add a university";
    ret = {error:error};
    res.status(200).json(ret);
   return;
  }

  const uniQuery = 'SELECT * FROM uniprofile WHERE name = ?';

  connection.query(uniQuery, [name], (err, results, fields) => {
    if (err) {
      console.error('Error checking for uni: ' + err.stack);
      res.status(500).send('Error checking for uni');
      error = err.sqlMessage;
      ret = {error:error};
      res.status(200).json(ret);
      return;
    }

    if (results.length > 0) {
      res.status(409).send('Uni already exists');
      error = 'University already exists';
      ret = {error:error};
      res.status(200).json(ret);
      return;
    }

    const insertQuery = 'INSERT INTO uniprofile (name, description, address, num_students) VALUES (?, ?, ?, ?)';

    connection.query(insertQuery, [name, description, address, num_students="0"], (err, results, fields) => {
      if (err) {
        console.error('Error creating uni: ' + err.stack);
        //res.status(500).send('Error creating uni');
        error = err.sqlMessage;
        ret = {error:error};
        res.status(200).json(ret);
        return;
      }

      res.status(201).send('Uni created successfully');
    });
  });
});

app.put('/api/joinUni', (req, res) => {
  const { uniid, userid } = req.body;
  var error = '';
  // Construct the SQL statement to update the user's email
  const sql = `UPDATE users SET uniid = ? WHERE userid = ?`;

  // Execute the SQL statement with the provided parameters
  connection.query(sql, [uniid, userid], (err, result) => {
      if (err) {
        error = err.sqlMessage;
      } else {
        console.log(`Updated uni for user ${userid} to ${uniid}`);
        res.send(`Updated uni for user ${userid} to ${uniid}`);
      }
      var ret = {error:error};
      res.status(200).json(ret);
    });
    
});

app.post('/api/createRSO', (req, res) => {
  const { newRSOid, name, userid, emails } = req.body;
  var error = '';
  var ret;
  var IDs = [];

  const checkUniqueQuery = 'SELECT * FROM rso WHERE name = ?';

  connection.query(checkUniqueQuery, [name], (err, results, fields) => {
    if (err) {
      console.error('Error checking for rso: ' + err.stack);
      res.status(500).send('Error checking for rso');
      error = err.sqlMessage;
      ret = {error:error};
      res.status(200).json(ret);
      return;
    }

    if (results.length > 0) {
      //res.status(409).send('RSO already exists');
      error = 'RSO already exists';
      ret = {error:error};
      res.status(200).json(ret);
      return;
    }
  })

    const createRSOQuery = 'INSERT INTO rso (rsoid, name, foreign_userid) VALUES (?, ?, ?)';

    connection.query(createRSOQuery, [newRSOid, name, userid], (err, results, fields) => {
      if (err) {
        console.error('Error creating rso: ' + err.stack);
        //res.status(500).send('Error creating uni');
        error = err.sqlMessage;
        ret = {error:error};
        res.status(200).json(ret);
        return;
      }

      //res.status(201).send('RSO created successfully');
      console.log("RSO created sucessfully");
    })

      const findIDsQuery = 'SELECT userid FROM users WHERE email = ?';

      for (var i = 0; i < 4; i++)
      {
        connection.query(findIDsQuery, [emails[i]], (err, results, fields) => {
          if (err) {
            console.error('Error finding IDs' + err.stack);
            //res.status(500).send('Error creating uni');
            error = err.sqlMessage;
            ret = {error:error};
            res.status(200).json(ret);
            return;
          }

          console.log("Results: " + results);
          console.log("Results[i]: " + results[i]);
          
          IDs[i] = results[i].userid;

          //res.status(201).send('RSO created successfully');
          console.log("IDs found successfully");
    })};
      
    const addMembersQuery = 'INSERT INTO rsomembers (rsoid, foreign_userid) VALUES (?, ?)';

    connection.query(createRSOQuery, [newRSOid, userid], (err, results, fields) => {
      if (err) {
        console.error('Error creating rso: ' + err.stack);
        //res.status(500).send('Error creating uni');
        error = err.sqlMessage;
        ret = {error:error};
        res.status(200).json(ret);
        return;
      }

      //res.status(201).send('RSO created successfully');
      console.log("RSO created sucessfully");

    })

      const adminQuery = 'UPDATE users SET userlevel = ? WHERE userid = ?';

      connection.query(adminQuery, ['admin', userid], (err, results, fields) => {
        if (err) {
          console.error('Error creating admin: ' + err.stack);
          //res.status(500).send('Error creating uni');
          error = err.sqlMessage;
          ret = {error:error};
          res.status(200).json(ret);
          return;
        }
        console.log("Admin created successfully");
      });
});

app.put('/api/joinRSO', (req, res) => {
  const { rsoid, userid} = req.body;

  var error = '';

  const checkExistsQuery = 'SELECT * FROM rso WHERE rsoid = ?';
  connection.query(checkExistsQuery, [rsoid], (err, results, fields) => {
    if (err) {
      console.error('Error checking for rso: ' + err.stack);
      res.status(500).send('Error checking for rso');
      error = err.sqlMessage;
      ret = {error:error};
      res.status(200).json(ret);
      return;
    }
    if (results.length == 0) {
      //res.status(409).send('RSO already exists');
      error = 'RSO not found';
      ret = {error:error};
      res.status(200).json(ret);
      return;
    }
    })

    const joinQuery = 'INSERT INTO rsomembers (rsoid, foreign_userid) VALUES (?, ?)';
    connection.query(joinQuery, [rsoid, userid], (err, results, fields) => {
    if (err) {
      error = err.sqlMessage;
    }
    else if (results.length == 0) {
      error = 'RSO Not found';
    }
    var ret = {userid:userid, error:error};
    res.status(200).json(ret);
    
  });
})

app.put('/api/leaveRSO', (req, res) => {
  const { rsoid, userid} = req.body;

  var error = '';

  const checkExistsQuery = 'SELECT * FROM rsomembers WHERE rsoid = ? AND foreign_userid = ?';
  connection.query(checkExistsQuery, [rsoid, userid], (err, results, fields) => {
    if (err) {
      console.error('Error checking for rso: ' + err.stack);
      res.status(500).send('Error checking for rso');
      error = err.sqlMessage;
      ret = {error:error};
    }
    if (results.length == 0) {
      //res.status(409).send('RSO already exists');
      error = "You aren't in this RSO";
      ret = {error:error};
    }
    })

    const leaveQuery = 'DELETE FROM rsomembers WHERE rsoid = ? AND foreign_userid = ?';
    connection.query(leaveQuery, [rsoid, userid], (err, results, fields) => {
    if (err) {
      error = err.sqlMessage;
    }

    var ret = {userid:userid, error:error};
    res.status(200).json(ret);
    
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
});