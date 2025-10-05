const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true,
    },
    date : {
        type: Date, default: Date.now
    }
}, {timestamps : true})

const Email = mongoose.model('Email', EmailSchema);
module.exports  = Email;