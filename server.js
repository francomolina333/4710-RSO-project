const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'iLoveVu',
    database: 'test1'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');

  const createUserTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        userid VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('Users table created!');
    });
  };
  const alterUserTable = () => {
    const query = `
      DROP TABLE users
    `;
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('Table altered!');
    });
  };
  const createEventTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS event (
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        eventid VARCHAR(255) NOT NULL,
        contactemail VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
      )
    `;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('Event table created!');
      });
    };
    const createCommentTable = () => {
        const query = `
          CREATE TABLE IF NOT EXISTS comment (
            commentid VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            time VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL
          )
        `;
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('Comment table created!');
    });
  };
  const createRSOTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS rso (
        rsoid VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
      )
    `;
connection.query(query, (err, result) => {
  if (err) throw err;
  console.log('RSO table created!');
});
};
const createUniProfileTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS uniProfile (
        uniid VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        num_students VARCHAR(255) NOT NULL,
        pictures VARCHAR(255) NOT NULL
      )
    `;
connection.query(query, (err, result) => {
  if (err) throw err;
  console.log('Uni_Profile table created!');
});
};
const createLocationTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS location (
        address VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        latitude VARCHAR(255) NOT NULL,
        longitude VARCHAR(255) NOT NULL
      )
    `;
connection.query(query, (err, result) => {
  if (err) throw err;
  console.log('Location table created!');
});
};

  createUserTable();
  createEventTable();
  createCommentTable();
  createRSOTable();
  createUniProfileTable();
  createLocationTable();

});