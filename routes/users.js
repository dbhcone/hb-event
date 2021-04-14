var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({message: 'you hit the users page', url: process.env.URL});
});

module.exports = router;
