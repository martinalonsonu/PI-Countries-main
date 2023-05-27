const axios = require('axios')
const { Country } = require('../db.js');
const { API_ENDPOINT } = process.env

const dataApi = async () => {
    try {
        const response = await axios.get(API_ENDPOINT)
        const data = response.data;
        const countries = data.map((element) => ({
            id: element.alpha3Code,
            name: element.name,
            flag: element.flags.png,
            continent: element.region,
            capital: element.capital,
            subregion: element.subregion,
            area: element.area,
            population: element.population
        }));
        await Country.bulkCreate(countries)
        console.log('Datos de la API guardados correctamente')
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { dataApi };
