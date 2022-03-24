const { Router } = require('express');
const router = Router();
const { Movement } = require('../db.js')

router.get('/', async (req, res, next) => {
    try {
        let info = await Movement.findAll()
        info = info.sort((a, b) => b.id - a.id)
        res.json(info)
    }
    catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { concept, date, amount, type } = req.body

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

router.put('/', async (req, res, next) => {
    const { id, concept, date, amount, type } = req.body;

    try {
        const updatedMovement = await Movement.update({
            concept,
            date,
            amount,
            type

        },
            { returning: true, where: { id: id } })
        res.json(updatedMovement)
    } catch (error) {
        next(error)
    }



})

router.patch

module.exports = router;