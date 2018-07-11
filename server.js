//server file for node

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://mongouser:BonganiZulu12345@ds135061.mlab.com:35061/sdbms_mongo', ['users']);
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var nodeMailer = require('nodemailer');
// Serve only the static files form the dist directory
app.all('*', function(req, res, next) {
     var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {   
 res.sendFile(path.join(__dirname+'/dist/index.html'));
});


app.use(cors());
app.use(bodyParser.json());

app.post('/addHistory', function (req, res) {
  db.history.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.post('/login', function (req, res) {
  db.users.find(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.post('/register', function (req, res) {
  db.users.insert(req.body, function(err, doc) {
    res.json(doc);
    //NodeMailer
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'wandile.chamane@gmail.com',
              pass: 'BonganiZulu123@'
          }
      });
      let mailOptions = {
          from: '"registrations" <registrations@smbd.com>', // sender address
          to: req.body.email, // list of receivers
          subject: 'Welcome to SDBMS', // Subject line
          //text: req.body.body, // plain text body
          html: '<b>Thanks For Registering</b><br /><p>Please click on the link below to activate your account or just copy and paste the link in your browser<br /><a href="http://sdbms.herokuapp.com/pages/user/'+res['_id']+'"></a></p>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              //res.render('index');
          });

  });
});

app.post('/updateUser/:id', function (req, res) {
    var id = req.params.id;
  db.users.update({"_id": mongojs.ObjectId(id)}, req.body ,function(err, doc) {
    res.json(doc);
  });
});

app.get('/getUpdatedUser/:id', function (req, res) {
  var id = req.params.id;
  db.users.find({"_id": mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log("Server running on port 8080");
