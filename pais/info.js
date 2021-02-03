// importamos axios
const axios = require('axios');

const getInfoCovidByCountryName = async(nombre) => {

    // preparar entrada país para que sea segura, ya que los espacios en blanco se pueden mal interpretar
    const encodedPais = encodeURI(nombre);
    //console.log(encodedPais);

    // creamos una instancia de AXIOS con una configuración personalizada (url reapidapi y el header necesario)
    const instance = axios.create({
        baseURL: `https://covid-19-data.p.rapidapi.com/country?name=${encodedPais}`,
        //timeout: 1000,
        headers: { 'x-rapidapi-key': 'f9274aa21emsh29e0cf20e131874p1db226jsn7c8c84e3f704' }
    });

    // ejecutar instancia
    const resp = await instance.get();

    if (resp.data.length === 0) {
        throw new Error(`No hay resultados para ${nombre}`)
    }

    const data = resp.data[0];
    const confirmed = data.confirmed;
    const recovered = data.recovered;
    const critical = data.critical;
    const deaths = data.deaths;
    const lastUpdate = data.lastUpdate;

    return {
        confirmed,
        recovered,
        critical,
        deaths,
        lastUpdate
    }
};

module.exports = {
    getInfoCovidByCountryName
}