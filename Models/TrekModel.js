const mongoose = require('mongoose');

const trekSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a title'],
	},
	image: {
		type: String,
		required: [true, 'Please add an Image'],
	},
	description: {
		type: String,
		required: [true, 'Please add an Desciption'],
	},
	price: {
		type: String,
		default: 0,
	},
	duration: {
		type: Number,
		default: 10,
	},
	difficulty: {
		type: String,
		enum: ['hard', 'medium', 'easy'],
		default: 'easy',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
});

module.exports = mongoose.model('Trek', trekSchema);
