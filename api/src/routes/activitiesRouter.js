const express = require('express')
const { postActivities } = require('../controllers/activitiesControler')

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body;
        const newActivity = await postActivities(name, difficulty, duration, season, countries);
        res.status(200).json(newActivity);
    } catch (error) {
        res.status(507).send("No se pudo almacenar la información");
    }
})

module.exports = router;