var bodyParser = require('body-parser');
var db = require('./database/dataservice.js');
var crypto = require('crypto');


db.connect();

var routes = function () {
    var router = require('express').Router();

    router.use(bodyParser.urlencoded({
        extended: true
    }));


    router.use(function (req, res, next) {
        //if it is api request, then check for valid token
        if (req.url.includes("/api")) {
            //first time use req.query
            var token = req.query.token;
            if (token == undefined) {
                res.status(401).send("No tokens are provided");
            } else {
                db.checkToken(token, function (err, user) {
                    if (err || user == null) {
                        res.status(401).send("Invalid token provided");
                    } else {

                        res.locals.account = user;
                        //means proceed on with the request.
                        next();
                    }
                });
            }
        } else { //means any other url, no need to check for auth 
            //means proceed on with the request.
            next();
        }
    })

    /*   
    These first 8 routes are for views only
    */



    router.get('/', function (req, res) {
        res.sendFile(__dirname + "/views/index.html");
    });

    router.get('/rent', function (req, res) {
        res.sendFile(__dirname + "/views/rent.html");
    });

    router.get('/contact', function (req, res) {
        res.sendFile(__dirname + "/views/contact.html");
    });

    router.get('/Search', function (req, res) {
        res.sendFile(__dirname + "/views/search.html");
    });

    router.get('/review', function (req, res) {
        res.sendFile(__dirname + "/views/review.html");
    });

    router.get('/login', function (req, res) {
        res.sendFile(__dirname + "/views/login.html");
    });

    router.get('/register', function (req, res) {
        res.sendFile(__dirname + "/views/register.html");
    });

    router.get('/addtocart', function (req, res) {
        res.sendFile(__dirname + "/views/addtocart.html");
    });

    router.get('/viewmovie', function (req, res) {
        res.sendFile(__dirname + "/views/viewmovie.html");
    });

    router.get('/cart', function (req, res) {
        res.sendFile(__dirname + "/views/cart.html");
    });

    router.get('/editcart', function (req, res) {
        res.sendFile(__dirname + "/views/editcart.html");
    });



    router.get('/ownreviews', function (req, res) {
        res.sendFile(__dirname + "/views/ownreviews.html");
    });

    router.get('/allreviews', function (req, res) {
        res.sendFile(__dirname + "/views/allreviews.html");
    });

    router.get('/movies', function (req, res) {
        db.getAllMovieInfo(function (err, movies) {
            if (err) {
                res.status(500).send("Unable to get movie information");
            } else {
                res.status(200).send(movies);
            }
        })

    })

    router.get('/movies/:id', function (req, res) {
        var id = req.params.id;
        db.getMovie(id, function (err, Movies) {
            if (err) {
                console.log("Movie NOT found");
                res.status(500).send("Unable to find a movie detail with this id");
            } else {
                console.log("Movie found");
                res.status(200).send(Movies);
            }
        });

    });







    router.post('/genre/search', function (req, res) {
        var genre = req.body.genre;
        db.searchMovieByGenre(genre, function (err, movies) {
            if (err) {
                res.status(500).send("Sorry, Unable to retrieve records based on your search");
            } else {
                res.status(200).send(movies);
            }
        })
    })

    router.post('/movies/search', function (req, res) {
        var movie = req.body.movie;
        db.searchMovie(movie, function (err, movies) {
            if (err) {
                res.status(500).send("Sorry, Unable to retrieve records based on your search");
            } else {
                res.status(200).send(movies);
            }
        })
    })





    router.get('/css/*', function (req, res) {
        res.sendFile(__dirname + "/views/" + req.originalUrl);
    });

    router.get('/js/*', function (req, res) {
        res.sendFile(__dirname + "/views/" + req.originalUrl);
    });


    router.post('/login', function (req, res) {
        var data = req.body;
        console.log(data);
        db.login(data.email, data.password, function (err, account) {
            if (err) {
                res.status(401).send("Login unsucessful. Please try again later");
            } else {
                console.log(account);
                if (account == null) {
                    res.status(401).send("Login unsucessful. Please try again later");
                } else {
                    var strToHash = account.email + Date.now();
                    var token = crypto.createHash('md5').update(strToHash).digest('hex');
                    db.updateToken(account._id, token, function (err, account) {
                        res.status(200).json({ 'message': 'Login successful.', 'token': token });
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
            db.getAllAccounts(function (err, accounts) {
                res.send(accounts);

            })
        })
    router.get('/accounts/:id', function (req, res) {
        var id = req.params.id;
        db.getAccount(id, function (err, accounts) {
            res.send(accounts);
        })

    })
    router.post('/registeraccount', function (req, res) {
        var data = req.body;
        db.addAccount(data.firstname, data.surname, data.email, data.password, data.dateofbirth,
            function (err, accounts) {
                res.send(accounts);
            })
    });


    router.post('/api/addtoCart', function (req, res) {
        var data = req.body;
        data.timestamp = Date.now();
        var account = res.locals.account._id;

        console.log(data);
        console.log(account);

        db.addToCart(data.movie, data.price, data.quantity, account, data.timestamp,
            function (err, order) {
                res.send(order);
            })
    });

    router.put('/editcart', function (req, res) {
        var data = req.body;
        data.timestamp = Date.now();
        var account = res.locals.account._id;

        console.log(data);
        console.log(account);

        db.updateCartItem(data.id, data.movie, data.price, data.quantity, account, data.timestamp,
            function (err, order) {
                res.send(order);
            })
    });



    router.post('/api/sendReview', function (req, res) {
        var data = req.body;
        data.timestamp = Date.now();
        var account = res.locals.account._id;
        db.addReview(data.movie, data.subject, data.reviewcomment, data.rating, account, data.movieId, data.timestamp,
            function (err, review) {
                res.send(review);
            })



    });



    router.get('/cartitem/:id', function (req, res) {
        var id = req.params.id;
        db.getCartById(id, function (err, event) {
            if (err) {
                res.status(500).send("Unable to find an event with this id");
            } else {
                res.status(200).send(event);
            }
        })
    })


    router.get('/api/cart', function (req, res) {
        var account = res.locals.account._id;
        //   var account = req.params.account;
        db.getCartOrderByAccount(account, function (err, cart) {
            if (err) {
                res.status(500).send("Unable to retrieve cart orders by account");
            }
            else {
                res.status(200).send(cart);

            }
        })
    })


    router.put('/api/editcart', function (req, res) {
        var data = req.body;
        data.timestamp = Date.now();
        db.updateCartItem(data.id, data.quantity, data.timestamp,
            function (err, event) {
                if (err) {
                    res.status(500).send("Unable to update the cart item");
                } else {
                    if (event == null) {
                        res.status(200).send("No event is updated");
                    } else {
                        res.status(200).send("Event has been updated successfully");
                    }
                }
            });
    })


    router.delete('/cart/:id', function (req, res) {
        var id = req.params.id;
        db.deleteCartItem(id, function (err, event) {
            if (err) {
                res.status(500).send("Unable to delete the cart item");
            } else {
                if (event == null) {
                    res.status(200).send("No cart item is deleted");
                } else {
                    res.status(200).send("Cart item has been deleted successfully");
                }
            }
        });
    })


    router.get('/reviews', function (req, res) {
        db.getAllReviews(function (err, movies) {
            res.send(movies);

        })
    })


    router.get('/api/reviews', function (req, res) {
        var account = res.locals.account._id;
        db.getReviewsByAccount(account, function (err, reviews) {
            if (err) {
                res.status(500).send("Unable to retrieve reviews by account");
            }
            else {
                res.status(200).send(reviews);

            }
        })
    })

    //cannot work
    router.get('/allreviews/:movie'), function (req, res) {
        var movie = req.body.movie;
        db.getReviewsByMovie(movie, function (err, moviereviews) {
            if (err) {
                res.status(500).send("Unable to retrieve movie reviews by movie");
            } else {
                res.status(200).send(moviereviews);
            }
        })
    }


    return router;


}

module.exports = routes();









