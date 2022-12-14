const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');

//@desc Register User
// @route POST/api/users/
//@access Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('please add all fields');
	}

	//check if user exist

	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error('User already Exist');
	}

	//HashPassword

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//create user

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});
	if (user) {
		res.status(200).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('INVALID USER DATA');
	}
});

//@desc Login a User
// @route POST/api/login/
//@access Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//check for user Email
	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('INVALID USER CREDENTIALS');
	}
});

//@desc get a User data
// @route GET/api/users/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id);
	res.status(200).json({
		id: _id,
		name,
		email,
	});
});
//Generate a token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
module.exports = {
	registerUser,
	loginUser,
	getMe,
};
