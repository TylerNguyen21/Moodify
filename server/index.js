require('dotenv').config({ path: './variables.env' });
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');
const cors = require('cors');
const app = express();
const processMessage = require('../process-message.js');
const twilio = require('twilio');
var accountSid = process.env.TWILIO_ACCOUNTSID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const serviceSid = process.env.TWILIO_SERVICESID

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(cors());
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
  let params = [req.body.username, req.body.name, req.body.password, req.body.email, req.body.phone, false];
  db.newUser(params, (err, result)=> {
    if (err) {
      throw err;
    } else {
      client.verify.services(serviceSid)
             .verifications 
             .create({to: `+1${req.body.phone}`, channel: 'sms'});
      res.status(201).send(result);
    }
  })
});

app.patch('/verify', (req, res)=> {
  client.verify.services(serviceSid)
               .verificationChecks
               .create({to: `+1${req.body.phone}`, code:`${req.body.code}`})
               .then(verification_check => {if(verification_check.status === 'approved') {
                db.phoneVerifier(req.body.username, (err, result) => {
                  if (err) {
                    throw err;
                  } else {
                    res.status(202).send(result)
                  }
                })
               } else {
                 res.status(401).send('Wrong code');
               }})
})


app.post('/moodify', (req, res) => {
  const { text } = req.body;
  processMessage(text);
  res.sendStatus(201);
});


app.set('port', process.env.PORT || 3000);
    const server = app.listen(app.get('port'), () => {
      console.log(`Express running → PORT ${server.address().port}`);
    });

