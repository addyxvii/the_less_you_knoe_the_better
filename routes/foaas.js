var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var options = {
  hostname: 'thecountedapi.com',
  path: '/api/counted/',
  method: 'GET',
  headers: {
    'Content-Type': 'application/xhtml+xml; charset=utf-8'
  }
}


/* GET home page. */
router.get('/counted', function(req, res, next) {
  var body = "";
  http.get(options, function(data) {
    data.on('data', function(chunk) {
      body += chunk.toString('utf8');
    });
    data.on('end', function() {
      console.log(body);
      body = JSON.parse(body);
      res.render('foaas/index', {body: body});
    });
  });
});

var paths = ['off', 'you', 'donut', 'shakespeare', 'linus', 'king', 'chainsaw', 'outside', 'madison', 'nugget', 'yoda', 'bus', 'xmas', 'bday', 'shutp', 'gfy', 'bm', 'back', 'think', 'keep', 'look'];

router.get('/off/:id', function(req, res, next) {
  var body = "";
  var name = req.params.id;
  var noun = paths[Math.floor(Math.random() * (paths.length - 1))]
  name = name.replace(" ", "%20");
  var options2 = {
    hostname: 'foaas.com',
    path: '/'+noun+'/'+name+'/The%20Police',
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  http.get(options2, function(data) {
    data.on('data', function(chunk) {
      body += chunk.toString('utf8');
      console.log(body);
    });
    data.on('end', function() {
      body = JSON.parse(body);
      res.render('foaas/show', {body: body});
    });
  })
})

module.exports = router;
