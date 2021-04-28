const mongoose = require('mongoose');

//schema.
const RecruitingAgencisSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    provinces: {
        type: String,
        require: true
    },
    postCode: {
        type: String,
        require: true
    }

});

module.exports = mongoose.model('RecruitingAgencis', RecruitingAgencisSchema);