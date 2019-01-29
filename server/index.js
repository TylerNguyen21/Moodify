require('dotenv').config({ path: '../variables.env' });
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql');
const cors = require('cors');
var app = express();
const processMessage = require('../process-message.js')

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

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

app.post('/moodify', (req, res) => {
  const { message } = req.body;
  processMessage(message);
});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

