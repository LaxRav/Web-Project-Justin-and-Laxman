var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = {};
var accountSchema = {};
var cartSchema = {};
var reviewSchema = {};
var accountModel;
var movieModel;
var cartModel;
var reviewModel;



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//mongoose debug messages
mongoose.set('debug', true);


var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/J&LHUB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initializing values
                movieSchema = schema({
                    movie: String,
                    price: Number,
                    description: String,
                    genre: String,
                    release: String,
                    distributor: String,
                    language: String,
                    image: String
                }),

                    accountSchema = schema({
                        firstname: String,
                        surname: String,
                        email: String,
                        password: String,
                        dateofbirth: Date,
                        token: String
                    });

                cartSchema = schema({
                    movie: String,
                    price: Number,
                    quantity: Number,

                    account: {
                        type: schema.Types.ObjectId,
                        ref: 'accounts'
                    },

                    movieid: {
                        type: schema.Types.ObjectId,
                        ref: 'movies'
                    },


                    timestamp: String,
                });



                reviewSchema = schema({

                    movie: String,
                    subject: String,
                    reviewcomment: String,
                    rating: Number,
                    timestamp: String,

                    account: {
                        type: schema.Types.ObjectId,
                        ref: 'accounts'
                    },

                    movieid: {
                        type: schema.Types.ObjectId,
                        ref: 'movies'
                    },


                });



                var connection = mongoose.connection;
                movieModel = connection.model('movies', movieSchema);
                accountModel = connection.model('accounts', accountSchema);
                cartModel = connection.model('carts', cartSchema);
                reviewModel = connection.model('reviews', reviewSchema);


            }
            else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },



    login: function (e, p, callback) {
        accountModel.findOne({ email: e, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        accountModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function (token, callback) {
        accountModel.findOne({ token: token }, callback);
    },
    removeToken: function (id, callback) {
        accountModel.findByIdAndUpdate(id, { $unset: { token: 1 } }, callback);
    },

    addAccount: function (fn, sn, e, p, dob, oida, callback) {
        var newAccount = new accountModel({
            firstname: fn,
            surname: sn,
            email: e,
            password: p,
            dateofbirth: dob,
            movieid: oida


        });
        newAccount.save(callback);
    },

    getAllAccounts: function (callback) {
        accountModel.find({}, callback);
    },

    getAccount: function (id, callback) {
        accountModel.findById(id, callback);
    },


    getMovie: function (id, callback) {
        movieModel.findById(id, callback);
    },

    updateMovieById: function (id, m, p, d, g, r, di, l, callback) {
        var updatedMovie = {
            movie: m,
            price: p,
            description: d,
            genre: g,
            release: r,
            distributor: di,
            language: l
        };
        movieModel.findByIdAndUpdate(id, updatedMovie, callback);
    },

    deleteMovie: function (id, callback) {
        movieModel.findByIdAndDelete(id, callback);
    },

    getAllMovieInfo: function (callback) {
        movieModel.find({}, callback);
    },



    searchMovie: function (movie, callback) {
        movieModel.find({ movie: RegExp(movie, 'i') }, callback);
    },

    searchMovieByGenre: function (genre, callback) {
        movieModel.find({ genre: RegExp(genre, 'i') }, callback);
    },


    addToCart: function (m, p, q, oid, ts, callback) {
        var newCustomer = new cartModel({
            movie: m,
            price: p,
            quantity: q,
            account: oid,
            timestamp: ts,


        });
        newCustomer.save(callback);

    },




    getCartById: function (id, callback) {
        cartModel.findById(id, callback);
    },

    updateCartItem: function (id, q, ts, callback) {
        var updatedCart = {
            quantity: q,
            timestamp: ts,
        };
        cartModel.findByIdAndUpdate(id, updatedCart, callback);

    },

    deleteCartItem: function (id, callback) {
        cartModel.findByIdAndDelete(id, callback);
    },

    searchCartByCustomerName: function (c, callback) {
        cartModel.find({ Customer: RegExp(c, 'i') }, callback);
    },

    removeCartByCustomer: function (Customer, callback) {
        cartModel.find({ account: accountid }, callback);
    },




    addReview: function (m, s, rc, r, oid, oida, ts, callback) {
        var newReview = new reviewModel({

            movie: m,
            subject: s,
            reviewcomment: rc,
            rating: r,
            account: oid,
            movieid: oida,
            timestamp: ts,
        });
        newReview.save(callback);

    },

    getCartOrderByAccount: function (accountid, callback) {
        cartModel.find({ account: accountid }, callback);
    },

    getReviewsByAccount: function (accountid, callback) {
        reviewModel.find({ account: accountid }, callback);
    },

    getReviewsByMovie: function (movie, callback) {
        reviewModel.find({ movie: movie }, callback);
    },


    getAllReviews: function (callback) {
        reviewModel.find({}, callback);
    },


};

module.exports = database;
