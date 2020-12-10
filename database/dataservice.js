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
           release: Number,
           distributor: String,
           language: String
       }),
       customerSchema = schema({
      name: String,
      age: Number,
      Region: String,
      Item: String,
      Price: Number,
      Identification: String
       });
       var connection = mongoose.connection;
      movieModel = connection.model('movies', movieSchema);
      customerModel = connection.model('Customer', customerSchema);

   } else {
       console.log("Error connecting to Mongo DB");
   }
     })
    },
  
     addCustomer: function(n, a, R, it, P, I, callback) {
        var newCustomer = new customerModel({
            name: n,
            age: a,
            Region: R,
            Item: it,
            Price: P,
            Identification: I
        });
        newCustomer.save(callback);

    },

    getAllCustomer: function(callback) {
        customerModel.find({}, callback);
    },

    getEvent: function(id, callback) {
        eventModel.findById(id, callback);
    },

    updateEvent: function(id, n, d, sd, st, ed, et,callback) {
        var updatedEvent = {
            name: n,
            description: d,
            start: {
                date: sd,
                time: st
            },
            end: {
                date: ed,
                time: et
            }
        };
        eventModel.findByIdAndUpdate(id, updatedEvent, callback);
    },

    deleteEvent: function(id,callback) {
        eventModel.findByIdAndDelete(id,callback);
    }


 }

module.exports = database;
