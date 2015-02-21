var mongoose = require('mongoose');

module.exports = mongoose.model('users', {
	fname : String,
	lname : String,
	country: String,
	city: String,
	email: String,
	age: Number
});