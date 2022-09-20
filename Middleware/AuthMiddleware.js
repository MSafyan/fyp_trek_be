const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');

const protect = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//get the token from the header
			token = req.headers.authorization.split(' ')[1];
			//verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			//get USer from the token
			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not Authorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not Authorized, No token');
	}
});

const adminOnly = asyncHandler(async (req, res, next) => {
	if (req.user.role === 'admin') {
		next();
		return;
	}
	res.status(401).send('not admin');
});

module.exports = { protect, adminOnly };
