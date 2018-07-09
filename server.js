//server file for node

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('SDBMS', ['users']);
var bodyParser = require('body-parser');

var cors = require('cors');

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
  });
});

app.post('/updateUser/:id', function (req, res) {
    var id = req.params.id;
  db.users.update({_id: mongojs.ObjectId(id)}, req.body ,function(err, doc) {
    res.json(doc);
  });


//   db.users.findAndModify({
//     query: { _id: id },
//     update: { $set: req.body},
//     new: false
// }, function (err, doc, lastErrorObject) {
//     // doc.tag === 'maintainer'
// })
});

app.get('/getUpdatedUser/:id', function (req, res) {
  var id = req.params.id;
  db.users.find({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('/getHistory/:id', function (req, res) {
	var id = req.params.id;
  	db.history.find({userId: id},function (err, docs) {
    //console.log(docs);
    res.json(docs);
  });
});

app.get('/checkuser/:username', function (req, res) {
	var username = req.params.username;
  	db.users.find({username: username},function (err, docs) {
    //console.log(docs);
    res.json(docs);
  });
});


app.listen(3000);
console.log("Server running on port 3000");