const { Country, Activity } = require('../db')

const postActivities = async (name, difficulty, duration, season, countries) => {

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
};

module.exports = { postActivities }