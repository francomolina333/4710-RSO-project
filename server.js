const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'iLoveVu',
    database: 'rso2'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');

  const createUserTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        userid INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        userlevel VARCHAR(255) NOT NULL,
        uniid INT
      )
    `;
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('Users table created!');
    });
  };

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
        avgratings FLOAT,
        numratings INT,
        eventtype VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        foreign_userid INT,
        FOREIGN KEY (foreign_userid) REFERENCES users(userid),
        foreign_rsoid INT,
        FOREIGN KEY (foreign_rsoid) REFERENCES rso(rsoid),
        foreign_uniid INT,
        FOREIGN KEY (foreign_uniid) REFERENCES uniProfile(uniid)
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
          name VARCHAR(255) NOT NULL,
          foreign_userid INT,
          FOREIGN KEY (foreign_userid) REFERENCES users(userid)
        )
      `;
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log('RSO table created!');
  });
  };
  const createRSOmembers = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS rsomembers (
        rsoid INT NOT NULL,
        foreign_userid INT,
        FOREIGN KEY (foreign_userid) REFERENCES users(userid)
      )
    `;
  connection.query(query, (err, result) => {
  if (err) throw err;
  console.log('RSOmembers table created!');
  });
  };
  const createUniProfileTable = () => {
      const query = `
        CREATE TABLE IF NOT EXISTS uniProfile (
          uniid INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          num_students INT,
          address VARCHAR(255)
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
  const createRatingTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS rating (
        ratingid INT AUTO_INCREMENT PRIMARY KEY,
        rating INT,
        foreign_userid INT,
        FOREIGN KEY (foreign_userid) REFERENCES users(userid),
        foreign_eventid INT,
        FOREIGN KEY (foreign_eventid) REFERENCES event(eventid)
      )
    `;
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log('Ratings table created!');
  });
  };

  createUserTable();
  createLocationTable();
  createRSOTable();
  createRSOmembers();
  createUniProfileTable();
  createEventTable();
  createRatingTable();
  createCommentTable();

});