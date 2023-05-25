const express = require('express')
const { postActivities, getActivities } = require('../controllers/activitiesControler')

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

router.get('/', async (req, res) => {
    try {
        const activities = await getActivities();
        activities ? res.status(200).json(activities) : res.status(404).json({ error: 'No se encontraron actividades' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;