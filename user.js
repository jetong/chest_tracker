var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lol');

var Schema = mongoose.Schema;
var userSchema = new Schema({
            username: {type: String, required: true, unique: true},    
                  id: String,
                days: String,
               hours: String,
             minutes: String,
           timestamp: String,
         totalChests: String,
     availableChests: String
});

// Export this schema as a User class so that other files can create users with this schema.
// Mongo collection name becomes 'users', the plural of the name provided.
module.exports = mongoose.model('User', userSchema);
