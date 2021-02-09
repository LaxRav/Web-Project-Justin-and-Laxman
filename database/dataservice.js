var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = {};
var accountSchema = {};
var cartSchema = {};
var reviewSchema = {};
var accountModel;
var movieModel;
var cartModel;

var commentModel;

var reviewModel = {};



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
                    timestamp: String,
                    });



                reviewSchema = schema({

                    movie: String,
                    subject: String,
                    reviewcomment: String,
                    rating: Number,
                    timestamp: String,
                   
                    account:{
                        type: schema.Types.ObjectId,
                        ref:'accounts'
                    }


                });



                var connection = mongoose.connection;
                movieModel = connection.model('movies', movieSchema);
                accountModel = connection.model('accounts', accountSchema);
                cartModel = connection.model('carts', cartSchema);
                reviewModel = connection.model('comments', reviewSchema);


        }
             else 
             {
                console.log("Error connecting to Mongo DB");
            }
        })
        },
    


  

    //getMovieById: function (id, callback) {
    //     movieModel.findById(id, callback);
    // },


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


    addAccount: function (fn, sn, e, p, dob, callback) {
        var newAccount = new accountModel({
            firstname: fn,
            surname: sn,
            email: e,
            password: p,
            dateofbirth: dob


            
        });
        newAccount.save(callback);
    },

    getAllAccounts: function (callback) {
        accountModel.find({}, callback);
    },

    getAccount: function (id, callback) {
        accountModel.findById(id, callback);
    },

    
    searchMovie: function (m, callback) {
        movieModel.find({ movie: new RegExp(m, 'i') }, callback);
    },

    searchMovieByGenre: function (g, callback) {
        movieModel.find({ genre: new RegExp(g, 'i') }, callback);
    },


    addToCart: function (m, p, q,oid, ts, callback) {
        var newCustomer = new cartModel({
            movie: m,
            price:p,
            quantity: q,
            account: oid,
            timestamp: ts,

           
        });
        newCustomer.save(callback);

    },

    updateCartItem: function (m, p, q,oid, ts, callback) {
        var newCustomer = new cartModel({
            movie: m,
            price:p,
            quantity: q,
            account: oid,
            timestamp: ts,

           
        });
        newCustomer.save(callback);

    },

    deleteCartItem: function (id, callback) {
        cartModel.findByIdAndDelete(id, callback);
    },

    searchCartByCustomerName: function (c, callback) {
        cartModel.find({ Customer: RegExp(c, 'i') }, callback);
    },



    getCommentsByMovie: function (m, callback) {
        commentModel.find({ message: RegExp(m, 'i') }, callback);
    },


    addReview: function (n, e, m, nb, s, r, ts, callback) {
        var newReview = new reviewModel({
            name: n,
            email: e,
            movie: m,
            namebest: nb,
            scale: s,
            recommedation: r,
            timestamp: ts,
        });
        newReview.save(callback);

    },

    getCartOrderByAccount: function(accountid, callback){
     cartModel.find({account:accountid}, callback);
    }
    


};

module.exports = database;
