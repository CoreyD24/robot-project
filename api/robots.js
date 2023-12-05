const express = require('express');
const router = express.Router();
const { getAllRobots } = require("../db/robots");

// /api/robots
router.get('/', async(req, res, next) => {
    try {
    const robots = await getAllRobots();
    res.send(robots)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;