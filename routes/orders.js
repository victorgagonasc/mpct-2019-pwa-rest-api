var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

firebase.initializeApp(config);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
