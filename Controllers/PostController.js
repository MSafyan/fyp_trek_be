const asyncHandler = require('express-async-handler');

const Post = require('../Models/PostModels');
const UserModel = require('../Models/UserModel');

// @desc Get posts
// @route GET/api/posts
// @access Private

const getAllposts = asyncHandler(async (req, res) => {
	const posts = await Post.find().populate('user');
	res.status(200).json(posts);
});

const getposts = asyncHandler(async (req, res) => {
	console.log(req.user.id);
	const posts = await Post.find({ user: req.user.id });
	res.status(200).json(posts);
});

//@desc Set posts
// @route POST/api/posts
//@access Private

const setpost = asyncHandler(async (req, res) => {
	if (!req.body.title) {
		res.status(400);
		throw new Error('Please add a title');
	}

	const post = await Post.create({
		title: req.body.title,
		description: req.body.description,
		user: req.user.id,
		image: req.file.filename,
	}).catch((e) => {
		console.log(e);
	});
	console.log(post);
	res.status(200).json(post);
});

//@desc Update posts
// @route PUT/api/posts/id
//@access Private

const updatepost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		res.status(400);
		throw new Error('post not found');
	}

	const user = await UserModel.findById(req.user.id);
	//check for the user
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}
	//make sure the logged in user matches the post user
	if (post.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}
	const updatedpost = await Post.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedpost);
});

//@desc Delete post
// @route DELETE/api/posts/id
//@access Private

const deletepost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		res.status(400);
		throw new Error('post not found');
	}

	//make sure the logged in user matches the post user
	// if (post.user.toString() !== req.user.id) {
	// 	res.status(401);
	// 	throw new Error('User not authorized');
	// }

	await post.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getposts,
	setpost,
	updatepost,
	deletepost,
	getAllposts,
};
