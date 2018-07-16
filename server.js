//server file for node

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var request = require('browser-request')
var request = require('request');
//mongodb:/heroku_zqhwnlc1:BonganiZulu12345@ds233571.mlab.com:33571/heroku_zqhwnlc1
var db = mongojs('mongodb://heroku_zqhwnlc1:9icrop3b7ar3bhri5phsfip0c8@ds233571.mlab.com:33571/heroku_zqhwnlc1', ['users']);
//var db = mongojs("SDBMS",['users']);
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var nodeMailer = require('nodemailer');
// Serve only the static files form the dist directory
// app.all('*', function(req, res, next) {
//      var origin = req.get('origin'); 
//      res.header('Access-Control-Allow-Origin', origin);
//      res.header("Access-Control-Allow-Headers", "X-Requested-With");
//      res.header('Access-Control-Allow-Headers', 'Content-Type');
//      next();
// });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
  db.users.find({'email':{$eq: req.body.email},'password':{$eq: req.body.password}}, function(err, doc) {
    if(doc.length < 0) res.json({status:"Incorrect Login"})
      else res.json(doc);
  });
});

app.post('/register', function (req, res) {
  db.users.insert(req.body, function(err, doc) {
    res.json(doc);
    //NodeMailer
      console.log();
      let id = doc['_id'];
      let phone = doc['phone'];
      let smskey = "lo1BExSRR6eP64Z0un_Ovw=="
      
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure:true,
          auth: {
              user: 'wandile.chamane@gmail.com',
              pass: 'qmhiezalzpxilcph'
          }
      });
      let mailOptions = {
          from: '"registrations" <registrations@smbd.com>', // sender address
          to: req.body.email, // list of receivers
          subject: 'Welcome to SDBMS', // Subject line
          //text: req.body.body, // plain text body
          html: '<b>Thanks For Registering</b><br /><p>Please click on the link below to activate your account or just copy and paste the link in your browser <br /><a href="https://sdbms.herokuapp.com/pages/user?activationId='+id+'">https://sdbms.herokuapp.com/pages/user?activationId='+id+'</a></p>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              //res.render('index');
          });

         var intPhone = phone;
          while(intPhone.charAt(0) === '0')
          {
            intPhone = intPhone.substr(1);
          }
           console.log(intPhone);
      request("https://platform.clickatell.com/messages/http/send?apiKey="+ smskey +"&to=+27"+intPhone+"&content=Thank you for registering on SDBMS check your mail to activate your account", function(er, response, body) {
          console.log(body+" "+er+" "+response);
        })

//       var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//       var xhr = new XMLHttpRequest();
//       xhr.open("GET", "https://platform.clickatell.com/messages/http/send?apiKey="+ smskey +"&to"+phone+"=&content=Thank you for registering on SDBMS check your mail to activate your account", true);
//       xhr.onreadystatechange = function(){
//      if (xhr.readyState == 4 && xhr.status == 200){
//         console.log('success')
//     }
//   };
// xhr.send();
  });
});

app.post('/updateUser', function (req, res) {
  console.log("update value:"+ req.body.city);
  var id = req.body.id;
 
 var updateData = {
     'username': req.body.username,
     'email': req.body.email,
     'password': req.body.password,
     'passwordconf': req.body.passwordconf,
     'phone': req.body.phone,
     'usertype': req.body.usertype,
     'company': req.body.company,
     'firstname': req.body.firstname,
     'lastname': req.body.lastname,
     'address': req.body.address,
     'city': req.body.city,
     'country': req.body.country,
     'postalcode': req.body.postalcode,
     'isActivated': req.body.isActivated
    };
 
 db.users.findAndModify({
    query: { "_id": mongojs.ObjectId(id)},
    update: { $set: updateData },
    new: true
}, function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
  res.json({"status":"Account Updated!"});
})
 
//   db.users.update({"_id": {$eq:mongojs.ObjectId(id)}}, {$set:
//     {
//      'username': req.body.username,
//      'email': req.body.email,
//      'password': req.body.password,
//      'passwordconf': req.body.passwordconf,
//      'phone': req.body.phone,
//      'usertype': req.body.usertype,
//      'company': req.body.company,
//      'firstname': req.body.firstname,
//      'lastname': req.body.lastname,
//      'address': req.body.address,
//      'city': req.body.city,
//      'country': req.body.country,
//      'postalcode': req.body.postalcode,
//      'isActivated': req.body.isActivated
//     }
//   });
//    res.json({"status":"Account Updated!"}); 
// });

app.post('/activate', function (req, res) {
  var id = req.body.id;
  db.users.update({"_id": {$eq:mongojs.ObjectId(id)}}, {$set: {isActivated: true}});
   res.json({"status":"Account Activated!"}); 
});

app.post('/getUpdatedUser', function (req, res) {
  var id = req.body.id;
  console.log(id)
  db.users.find({"_id": {$eq:mongojs.ObjectId(id)}}, function(err, doc) {
    console.log(doc);
    res.json(doc);
  });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log("Server running on port 8080");
