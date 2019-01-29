var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require('../database-mysql');
// var items = require('../database-mongo');
const cors = require('cors');
var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/users', function (req, res) {
  db.grabAllUsers(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.status(200);
      res.json(data);
    }
  });
});

app.post('/login', (req, res) => {
  db.loginChecker(req.body.username, (err, result) => {
    if (err) {
      throw err;
    }
    if (result[0].password === req.body.password) {
      res.status(201).send(result);
    }
  })
});

app.post('/creation', (req, res) => {
  let params = [req.body.username, req.body.name, req.body.password, req.body.email];
  db.newUser(params, (err, result)=> {
    if (err) {
      throw err;
    } else {
      res.status(201).send(result);
    }
  })
})

app.post('/moodify', (req, res)=> {

});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

