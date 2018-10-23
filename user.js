const mongoose = require('mongoose');
var uri = "mongodb+srv://admin:admin@cluster0-ue1al.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true });

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
