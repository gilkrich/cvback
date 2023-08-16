const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    img : { type: String},
    adress : {type:String,required:true},
    phone : {type:String,required:true},
    email : {type:String,required:true},
    age : {type:String,required:true},  
    skill1 : {type:String,required:true},  
    skill2 : {type:String},  
    skill3 : {type:String},  
    skill4 : {type:String},  
    skill5 : {type:String},  
    lang1 : {type:String,required:true},  
    lang2 : {type:String},  
    lang3 : {type:String},  
    lang4 : {type:String},  
    lang5 : {type:String}, 
    objective : {type:String,required:true}, 
    expirence1 : {
        proffsion : {type:String,required:true},
        time : {type:String,required:true},
        info : {type:String,required:true}
    } ,     
    expirence2 : {
        proffsion : {type:String},
        time : {type:String},
        info : {type:String}
    } ,

    expirence3 : {
        proffsion : {type:String},
        time : {type:String},
        info : {type:String}
    } ,
    eduction : {
        school : {type:String,required:true},
        years : {type:String,required:true},
        bonus: {type:String}
    },
    degree : {
        school : {type:String},
        type : {type:String},
        bonus: {type:String},
        bonus2: {type:String}
    }


});

module.exports = mongoose.model('Cvtemp', cvSchema);