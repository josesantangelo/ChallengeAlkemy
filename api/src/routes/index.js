const { Router } = require('express');
const router = Router();
const { Movement } = require('../db.js')

router.get('/', async (req, res, next) => {
    try {
        const info = await Movement.findAll()
        res.json(info)
    }
    catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { concept, date, amount, type } = req.body
    const concept2 = "pepe"
    try {
        const newMovement = await Movement.create({
            concept,
            date,
            amount,
            type
        })
        res.json(newMovement)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;