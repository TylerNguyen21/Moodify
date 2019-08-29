const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'moodify'
});

const grabAllUsers = function(callback) {
  connection.query('SELECT username FROM users', function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const loginChecker = (username, callback) => {
  connection.query(`SELECT password, name FROM users WHERE username = '${username}'`, (error, results)=> {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  })
} 

const newUser = (params, callback) => {
  connection.query(`INSERT INTO users (username, name, password, email, phone, verified) VALUES (?, ?, ?, ?, ?, ?)`, params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const phoneVerifier = (user, callback) => {
  connection.query(`UPDATE users SET verified=${true} WHERE username='${user}'`), (err, result) => {
    if (err) {
      callback (err, null);
    } else {
      callback(null, result);
    }
  }
}

module.exports = {
  connection,
  grabAllUsers,
  loginChecker,
  newUser,
  phoneVerifier
}
  
