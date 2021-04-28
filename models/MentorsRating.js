const mongoose = require('mongoose');

//schema.
const MentorsRatingSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    mentorsName:
    {
        type: String,
        require: true        
    },
    rate:
    {
        type: String,
        require: true
    }

});

module.exports = mongoose.model('MentorsRatingStories', MentorsRatingSchema);