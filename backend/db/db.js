const { default: mongoose } = require("mongoose");
const userModel = require("./models/user.model");

mongoose.connec("mongodb+srv://admin:N1QSZgA78glwJnKc@cluster0.gblax.mongodb.net/paytm");

const User = mongoose.model('User', userModel);

module.exports = {
    User
};