const express = require(`express`);
const router = express.Router();

//api/robots
router.use('/robots', require('./robots.js'));

module.exports = router;