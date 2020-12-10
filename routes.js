var bodyParser = require('body-parser');
var db = require('./database/dataservice.js');
db.connect();

    var routes = function() {
        var router = require('express').Router();

        router.use(bodyParser.urlencoded({
   extended: true
        }));

        router.get('/', function(req, res) {
     res.sendFile(__dirname + "/views/index.html");
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

