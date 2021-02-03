const info = require('./pais/info');
const colors = require('colors');

const argv = require('yargs').options({ // sin comandos
    pais: {
        alias: 'p',
        desc: 'País del que se requiere obtener la información relacionada a contagios de COVID-19',
        demand: true
    }
}).argv;

const getInfo = async(nombre) => {

    try {
        const data = await info.getInfoCovidByCountryName(nombre);
        return `
            --------------------- COVID-19 -----------------------
            País: ${nombre}
            Casos confirmados: ${colors.cyan(data.confirmed)}
            Casos recuperados: ${colors.green(data.recovered)}
            Casos críticos   : ${colors.magenta(data.critical)}
            Muertes          : ${colors.red(data.deaths)}
            ------------------------------------------------------
            Actualizado a    : ${colors.yellow(data.lastUpdate)}
            ------------------------------------------------------
    }`;
    } catch (e) {
        return `No existen datos para ${nombre}`;
    }
}

getInfo(argv.pais)
    .then(response => console.log(response))
    .catch(error => console.log(error));