var bodyParser = require('body-parser');
var db = require('./database/dataservice.js');
db.connect();

    var routes = function() {
        var router = require('express').Router();
  
        router.use(bodyParser.urlencoded({
   extended: true
        }));

        /* These first 5 routes are for views only
        */

        router.get('/', function(req, res) {
     res.sendFile(__dirname + "/views/index.html");
        });

        router.get('/rent', function(req, res) {
         res.sendFile(__dirname + "/views/rent.html");
            });

            router.get('/contact', function(req, res) {
               res.sendFile(__dirname + "/views/contact.html");
                  });

                  router.get('/Search', function(req, res) {
                     res.sendFile(__dirname + "/views/search.html");
                        });

                        router.get('/review', function(req, res) {
                           res.sendFile(__dirname + "/views/review.html");
                              });
        
        router.get('/css/*', function(req, res) {
     res.sendFile(__dirname+"/views/"+req.originalUrl);
        });

         router.get('/js/*', function(req, res) {
     res.sendFile(__dirname+"/views/"+req.originalUrl);
        });
        return router;

    };

    module.exports = routes();

