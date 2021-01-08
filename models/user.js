const mongoose = require('mongoose');
var bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,

    },
    password: {
        type: String,
    }
});

// userSchema.pre("save", async () => {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })

var user = mongoose.model('userSchema', userSchema);

module.exports = user;