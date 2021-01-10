var bodyParser = require('body-parser');
var db = require('./database/dataservice.js');
var crypto = require('crypto');

db.connect();

    var routes = function() {
        var router = require('express').Router();
  
        router.use(bodyParser.urlencoded({
   extended: true
        }));

        /*   
        These first 5 routes are for views only
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
        
               router.get('/movies', function(req, res) {
                        db.getAllMovieInfo(function (err, Movies) {
                        if(err) {
                           res.status(500).send("Unable to get movie information");
                        } else {
                           res.status(200).send(Movies);
                        }
                        })
                        
                     })

                     router.get('/movies/:id', function (req, res) {
                        var id = req.params.id;
                        db.getMovieById(id, function(err, Movies) {
                            if (err) {
                                res.status(500).send("Unable to find a movie detail with this id");
                            } else {
                                res.status(200).send(Movies);
                            }
                        });
               
                    });

                    router.get('/customer', function(req, res) {
                     db.getAllCustomer(function (err, Customer) {
                     if(err) {
                        res.status(500).send("Unable to get movie information");
                     } else {
                        res.status(200).send(Customer);
                     }
                     })
                     
                  })
               
        
        router.get('/css/*', function(req, res) {
     res.sendFile(__dirname+"/views/"+req.originalUrl);
        });

         router.get('/js/*', function(req, res) {
     res.sendFile(__dirname+"/views/"+req.originalUrl);
        });


        router.get('/login', function (req, res) {
         res.sendFile(__dirname + "/views/login.html");
      });
   
      router.get('/register', function (req, res) {
         res.sendFile(__dirname + "/views/register.html");
      });

      router.post('/login', function (req, res) {
         var data = req.body;
         db.login(data.email, data.password, function (err, user) {
             if (err) {
                 res.status(401).send("Login unsucessful. Please try again later");
             } else {
                 if (user == null) {
                     res.status(401).send("Login unsucessful. Please try again later");
                 } else {
      
                     var strToHash = user.email + Date.now();
                     var token = crypto.createHash('md5').update(strToHash).digest('hex');
                     db.updateToken(user._id, token, function (err, user) {
                        res.sendFile(__dirname + "/views/rent.html");

                    //     res.status(200).json({ 'message': 'Login successful.', 'token': token });
                     });
      
                 }
             }
         })
      
      })


      router.get("/logout", function (req, res) {
         var token = req.query.token;
         if (token == undefined) {
             res.status(401).send("No tokens are provided");
         } else {
             db.checkToken(token, function (err, user) {
                 if (err || user == null) {
                     res.status(401).send("Invalid token provided");
                 } else {
                     db.removeToken(user._id, function (err, user) {
                         res.status(200).send("Logout successfully")
                     });
                 }
             })
         }
   
     }),

     router.get('/accounts', function (req, res) {
    
        db.getAllAccounts(function (err, events) {
            res.send(events);
    
        })
    })
    router.get('/accounts/:id', function (req, res) {
        var id = req.params.id;
        db.getAccount(id, function (err, event) {
            res.send(event);
        })

    })
    router.post('/registeraccount', function (req, res) {
        var data = req.body;
        db.addAccount(data.email, data.password,
            function (err, event) {
                res.sendFile(__dirname + "/views/rent.html");
            })
    });



        return router;

    };

    module.exports = routes();

