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
        total_chests: String,
    available_chests: String
});

// export this schema as a User class so that other files can create users with this schema.
module.exports = mongoose.model('User', userSchema);
