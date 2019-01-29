require('dotenv').config({ path: '../variables.env' });
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql');
const cors = require('cors');
var app = express();
const processMessage = require('../process-message')

app.use(cors());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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



app.set('port', process.env.PORT || 3000);
    const server = app.listen(app.get('port'), () => {
      console.log(`Express running → PORT ${server.address().port}`);
    });

