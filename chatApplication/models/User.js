const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing 
//for saving your password securely intd DB.

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    createdAt:{
       type:Date,
        default: Date.now,
    }
})

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;