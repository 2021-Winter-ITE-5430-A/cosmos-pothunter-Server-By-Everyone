const mongoose = require('mongoose');

//schema.
const UserSuccessStoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    date:
    {
        type: Date        
    },
    storydetails:
    {
        type:String
    }

});

module.exports = mongoose.model('UserSuccessStories', UserSuccessStoriesSchema);