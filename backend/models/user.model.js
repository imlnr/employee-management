const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, {
    versionKey: false
})
const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}