const express = require('express');
const router = express.Router();
const {
	getfavorites,
	setfavorite,
	deletefavorite,
} = require('../Controllers/FavoriteController');
const { upload } = require('../Controllers/uploads');

const { protect } = require('../Middleware/AuthMiddleware');
router.route('/').get(protect, getfavorites).post(protect, setfavorite);

router.route('/:id').delete(protect, deletefavorite);

module.exports = router;
//PostRoute
