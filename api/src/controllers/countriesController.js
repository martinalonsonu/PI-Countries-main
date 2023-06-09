const { Country, Activity } = require('../db')
const { Op } = require('sequelize')

const getAllCountries = async () => {
    try {
        const getCountries = await Country.findAll({
            attributes: ['id', 'name', 'flag', 'continent', 'capital', 'subregion', 'area', 'population'],
            include: [
                {
                    model: Activity,
                    attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
                    through: []
                }
            ]
        })
        return getCountries
    } catch (error) {
        return { error: error.message }
    }
}

const getCountryName = async (name) => {
    try {
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `${name}%`,
                },
            },
            attributes: [
                "id",
                "name",
                "flag",
                "continent",
                "capital",
                "subregion",
                "area",
                "population",
            ],
            include: [
                {
                    model: Activity,
                    attributes: ["id", "name", "difficulty", "duration", "season"],
                    through: []
                },
            ],
        });
        return countries;
    } catch (error) {
        return { error: error.message }
    }
};

const getCountryId = async (id) => {
    try {
        const country = await Country.findByPk(id.toUpperCase(), {
            attributes: [
                "id",
                "name",
                "flag",
                "continent",
                "capital",
                "subregion",
                "area",
                "population",
            ],
            include: [
                {
                    model: Activity,
                    attributes: ["id", "name", "difficulty", "duration", "season"],
                    through: []
                },
            ],
        })
        if (!country) {
            throw new Error('País no encontrado');
        }
        return country;
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = { getAllCountries, getCountryName, getCountryId };