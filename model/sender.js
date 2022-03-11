const mongoose = require('mongoose') ;

const Sender = mongoose.Schema({
    its : {
        type : String ,
        required : true 
    } ,
    msg : {
        type : String ,
        required : true 
    }
});

module.exports = mongoose.model('sender' , Sender);