const express = require('express');
const router = express.Router();
const { validateCookie } = require('../middlewares/auth');
const { allFavs, addFav, deleteFav } = require('../controllers/favsController');

router.get('/', validateCookie, allFavs);
router.post('/add', validateCookie, addFav);
router.delete('/delete', validateCookie, deleteFav);

module.exports = router;
