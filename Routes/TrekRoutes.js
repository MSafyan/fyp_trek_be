const express = require('express');
const router = express.Router();
const {
	getAllTreks,
	setTrek,
	updateTrek,
	deleteTrek,
} = require('../Controllers/TrekController');
const { upload } = require('../Controllers/uploads');
const { protect, adminOnly } = require('../Middleware/AuthMiddleware');
router
	.route('/')
	.get(protect, getAllTreks)
	.post(protect, adminOnly, upload.single('image'), setTrek);
router
	.route('/:id')
	.delete(protect, adminOnly, deleteTrek)
	.put(protect, adminOnly, updateTrek);

module.exports = router;
//GoalRoute
