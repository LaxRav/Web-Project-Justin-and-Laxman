var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = {};
var accountSchema = {};
var accountModel;
var movieModel;


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//mongoose debug messages
mongoose.set('debug', true);


var database = {
 connect: function() {
     mongoose.connect('mongodb://localhost:27017/J&LHUB', function(err) {
   if(err == null) {
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
        email: String,
        password: String,
        token: String
    });


       var connection = mongoose.connection;
      movieModel = connection.model('movies', movieSchema);
      accountModel= connection.model('accounts', accountSchema);

   } else {
       console.log("Error connecting to Mongo DB");
   }
     })
    },

  
     addCustomer: function(n, r, it, p, id, pn, callback) {
        var newCustomer = new customerModel({
            Name: n,
            Region: r,
            Item: it,
            Price: p,
            ID: id,
            PhoneNo: pn
        });
        newCustomer.save(callback);

    },

    getAllCustomer: function(callback) {
        customerModel.find({}, callback);
    },

    getMovieById: function(id, callback) {
        movieModel.findById(id, callback);
    },

    updateMovieById: function(id, m, p, d, g, r, di, l, callback) {
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

    deleteMovie: function(id,callback) {
        movieModel.findByIdAndDelete(id,callback);
    },

   

    getAllMovieInfo: function(callback) {
   movieModel.find({}, callback);
    },

    login: function (e, p, callback) {
        accountModel.findOne({ email: e, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        accountModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        accountModel.findOne({token:token},callback);
    },
    removeToken: function(id,callback) {
        accountModel.findByIdAndUpdate(id, {$unset: {token: 1}},callback);
    },


    addAccount: function(e,p, callback) {
        var newAccount = new accountModel({
            email: e,
            password: p
        });
        newAccount.save(callback);
    },

    getAllAccounts: function(callback) {
        accountModel.find({},callback);
    },

    getAccount: function(id, callback) {
        accountModel.findById(id,callback);
    },

    searchMovie: function(m, callback) {
        movieModel.find({movie: new RegExp(m,'i')}, callback);
    },

    searchMovieByGenre: function(g, callback) {
        movieModel.find({genre: new RegExp(g,'i')}, callback);
    },



 };

module.exports = database;
