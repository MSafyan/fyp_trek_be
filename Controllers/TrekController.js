const asyncHandler = require('express-async-handler');
const Trek = require('../Models/TrekModel');
const UserModel = require('../Models/UserModel');

//@desc Get treks
// @route GET/api/treks
//@access Private

const getAllTreks = asyncHandler(async (req, res) => {
	const treks = await Trek.find();
	res.status(200).json(treks);
});

//@desc Set treks
// @route POST/api/treks
//@access Private

const setTrek = asyncHandler(async (req, res) => {
	const { title, description, price, duration, difficulty } = req.body;
	console.log(req.file);
	console.log(req.files);
	if (!title) {
		res.status(400);
		throw new Error('Please add a textfield');
	}
	console.log(req.body);
	const trek = await Trek.create({
		title,
		description,
		price,
		duration,
		difficulty,
		image: req.file.filename,
	}).catch((e) => {
		console.log(e);
	});
	res.status(200).json(trek);
});

//@desc Update treks
// @route PUT/api/treks/id
//@access Private

const updateTrek = asyncHandler(async (req, res) => {
	const trek = await Trek.findById(req.params.id);
	if (!trek) {
		res.status(400);
		throw new Error('trek not found');
	}

	const user = await UserModel.findById(req.user.id);
	//check for the user
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}
	//make sure the logged in user matches the trek user
	//check for the user
	if (!user.role === 'admin') {
		res.status(401);
		throw new Error('User not authorized');
	}
	const updatedtrek = await trek.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedtrek);
});

//@desc Delete trek
// @route DELETE/api/treks/id
//@access Private

const deleteTrek = asyncHandler(async (req, res) => {
	const trek = await Trek.findById(req.params.id);
	if (!trek) {
		res.status(400);
		throw new Error('trek not found');
	}

	const user = await UserModel.findById(req.user.id);
	//check for the user
	if (!user.role === 'admin') {
		res.status(401);
		throw new Error('User not authorized');
	}
	await trek.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getAllTreks,
	setTrek,
	updateTrek,
	deleteTrek,
};
