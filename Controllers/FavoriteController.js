const asyncHandler = require('express-async-handler');

const Favorite = require('../Models/FavoriteModel');

// @desc Get posts
// @route GET/api/posts
// @access Private

const getAllposts = asyncHandler(async (req, res) => {
	const posts = await Favorite.find().populate('trek');
	res.status(200).json(posts);
});

const getfavorites = asyncHandler(async (req, res) => {
	const posts = await Favorite.find({ user: req.user.id }).populate('trek');
	res.status(200).json(posts);
});

//@desc Set posts
// @route POST/api/posts
//@access Private

const setfavorite = asyncHandler(async (req, res) => {
	const alreadyExists = await Favorite.find({
		trek: req.body.trek,
		user: req.user.id,
	});
	if (alreadyExists.length < 1) {
		const post = await Favorite.create({
			trek: req.body.trek,
			user: req.user.id,
		}).catch((e) => {
			console.log(e);
		});
		console.log(post);
		res.status(200).json(post);
	} else {
		res.json({ msg: 'already added', id: alreadyExists[0]._id });
	}
});

const deletefavorite = asyncHandler(async (req, res) => {
	const favorite = await Favorite.findById(req.params.id);
	if (!favorite) {
		res.status(400);
		throw new Error('favorite not found');
	}

	//make sure the logged in user matches the post user
	if (favorite.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await favorite.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getfavorites,
	setfavorite,
	deletefavorite,
};
