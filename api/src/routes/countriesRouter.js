const express = require('express')
const { getAllCountries, getCountryName, getCountryId } = require('../controllers/countriesController')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { name } = req.query
        if (name) {
            const country = await getCountryName(name);
            res.status(200).json(country);
        } else {
            const countries = await getAllCountries();
            res.status(200).json(countries)
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const country = await getCountryId(id)
            if (country) {
                res.status(200).json(country)
            } else {
                res.status(404).json({ error: 'País no encontrado' })
            }
        } else {
            res.status(400).json({ error: 'No se ingresó ID' })
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

module.exports = router;