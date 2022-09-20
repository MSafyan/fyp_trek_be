const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	user: { type: mongoose.Schema.ObjectId, ref: 'User' },
	title: {
		type: String,
		required: [true, 'Please add a text value'],
	},
	description: {
		type: String,
		required: [true, 'Please add a text value'],
	},
	image: {
		type: String,
		required: [true, 'Please add an Image'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
});

module.exports = mongoose.model('Post', postSchema);
