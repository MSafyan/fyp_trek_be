const express = require('express');
const router = express.Router();
const {
	getposts,
	setpost,
	updatepost,
	deletepost,
	getAllposts,
} = require('../Controllers/PostController');
const { upload } = require('../Controllers/uploads');
const { protect } = require('../Middleware/AuthMiddleware');
router
	.route('/')
	.get(protect, getAllposts)
	.post(protect, upload.single('image'), setpost);
router.route('/:id').delete(protect, deletepost).put(protect, updatepost);
router.route('/getAllPosts').get(protect, getAllposts);

module.exports = router;
//PostRoute
