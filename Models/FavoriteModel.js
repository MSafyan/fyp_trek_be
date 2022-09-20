const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
	trek: { type: mongoose.Schema.ObjectId, ref: 'Trek' },
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
});

module.exports = mongoose.model('Favorite', favoriteSchema);
