const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a Name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
		},
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			unique: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('User', userSchema);
