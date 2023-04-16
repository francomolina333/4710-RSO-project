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
        userid INT AUTO_INCREMENT PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('Users table created!');
    });
  };
//   const alterUserTable = () => {
//     const query = `
//       DROP TABLE users
//     `;
//     connection.query(query, (err, result) => {
//       if (err) throw err;
//       console.log('Table altered!');
//     });
//   };
  const createEventTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS event (
        eventid INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        contactemail VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        foreign_locationid VARCHAR(255),
        FOREIGN KEY (foreign_locationid) REFERENCES location(name)
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
            commentid INT AUTO_INCREMENT PRIMARY KEY,
            author VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            time VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            foreign_userid INT,
            FOREIGN KEY (foreign_userid) REFERENCES users(userid),
            foreign_eventid INT,
            FOREIGN KEY (foreign_eventid) REFERENCES event(eventid)
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
        rsoid INT AUTO_INCREMENT PRIMARY KEY,
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
        uniid INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        num_students VARCHAR(255) NOT NULL,
        pictures VARCHAR(255) NOT NULL,
        foreign_locationid VARCHAR(255),
        FOREIGN KEY (foreign_locationid) REFERENCES location(name)
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
        name VARCHAR(255) PRIMARY KEY,
        address VARCHAR(255) NOT NULL,
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