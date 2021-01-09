var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = {};
var customerSchema = {};
var movieModel;
var customerModel;


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
           language: String
       }),
       customerSchema = schema({
      Name: String,
      Region: String,
      Item: String,
      Price: Number,
      ID: String,
      PhoneNo: Number
       });
       var connection = mongoose.connection;
      movieModel = connection.model('Movies', movieSchema);
      customerModel = connection.model('Customer', customerSchema);

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

    deleteCustomer: function(id, callback) {
        customerModel.findByIdAndDelete(id, callback);
    },

    getAllMovieInfo: function(callback) {
   movieModel.find({}, callback);
    }

 };

module.exports = database;
