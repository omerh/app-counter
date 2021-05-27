var express = require('express');
var redis = require('redis');
var os = require('os');
const logger = require('pino')();

var app = express();

var redis_port = process.env.REDIS_PORT || 6379;
var redis_host = process.env.REDIS_HOST || 'localhost';

var client = redis.createClient(redis_port, redis_host);

client.on('error', function (err) {
    logger.info('Client ' + err);
});

app.get('/', function (req, res, next) {
    client.incr('counter', function(err, counter) {
        if(err) {
            res.status(500).send('GET ' + err);
            logger.error(err)
            return next(err);
        }
        res.send('Hello from app-counter<br>Page hits: ' + counter + '<br>Hostname: ' + os.hostname());
        logger.info(counter + ' times');
    });
});

app.get('/healthcheck', function (req, res) {
  client.get('counter', function(err,reply){
    logger.info(reply)
    if(reply == null || reply < 10){
      res.status(200).send('GET ' + reply)
      logger.info(reply)
    }else {
      res.status(500).send('GET ' + reply);
      logger.info(reply)
    };
  });
});

app.listen(3000, function () {
  logger.info('Example app listening on port 3000!')
});