const { Router } = require('express');
const router = Router();
const { Movement } = require('../db.js')

router.get('/', async (req, res) => {
    try {
        const info = await Movement.findAll()
        res.json(info)
    }
    catch (error) {
        next(error)
    }
})

router.post('/', async (req, res) => {
    const { concept, date, amount, type } = req.body
    try {
        const newMovement = Movement.create({
            concept,
            date,
            amount,
            type
        })
        console.log(newMovement)
        res.json(newMovement)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;