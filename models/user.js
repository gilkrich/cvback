const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    personinfo : [
        {type:mongoose.Types.ObjectId,ref:'Cvtemp'}
        ]
});

module.exports = mongoose.model('User', userSchema);

    // personinfo : {type:mongoose.Types.ObjectId,ref:'Cvtemp'}  