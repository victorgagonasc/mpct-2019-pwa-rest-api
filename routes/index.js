var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Welcome to Unimetrocamp Wyden MPCT 2019 PWA REST API');
});

module.exports = router;
