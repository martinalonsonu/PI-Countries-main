const { Country, Activity } = require('../db')

const postActivities = async (name, difficulty, duration, season, countries) => {
    try {
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });
        const country = await Country.findAll({
            where: {
                name: countries,
            },
        });
        newActivity.addCountry(country);
        return newActivity;
    } catch (error) {
        return { error: error.message }
    }
};

const getActivities = async () => {
    try {
        const activities = await Activity.findAll({
            attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
            include: [{
                model: Country,
                attributes: ['id', 'name', 'flag', 'continent', 'capital', 'subregion', 'area', 'population']
            }]
        })
        return activities;
    } catch (error) {
        return { error: error.message }
    }
}

const deleteActivities = async (id) => {
    try {
        await Activity.destroy({
            where: {
                id: id
            }
        });
    } catch (error) {
        return { error: error.message }
    }
}

const updateActivities = async (id, name, difficulty, duration, season, countries) => {
    try {
        const activity = await Activity.findByPk(id)
        if (!activity) throw new Error('No existe la actividad');
        const updateActivity = await activity.update({
            name,
            difficulty,
            duration,
            season,
        })
        const country = await Country.findAll({
            where: {
                name: countries,
            },
        });
        await updateActivity.setCountries(country)
        return updateActivity;

    } catch (error) {
        return { error: error.message }
    }
}


module.exports = { postActivities, getActivities, deleteActivities, updateActivities }