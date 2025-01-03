const { default: mongoose } = require("mongoose");
const userModel = require("./models/user.model");
const accountSchema = require("./models/account.model");

mongoose.connec("mongodb+srv://admin:N1QSZgA78glwJnKc@cluster0.gblax.mongodb.net/paytm");

const User = mongoose.model('User', userModel);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account,
};