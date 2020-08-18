const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

// lugar.getLugarLatLngGeoCode(argv.direccion)
//     .then(resp => console.log(resp))
//     .catch(err => console.log(err));

// lugar.getLugarLatLngGeoCode(argv.direccion)
//     .then(resp => clima.getClima(resp.latitude, resp.longitude)
//         .then(resp => console.log('respfinal', resp))
//         .catch(err => console.log(err)))
//     .catch(err => console.log(err));


const getInfo = async(direccion) => {

    let geolocalizacion = await lugar.getLugarLatLngGeoCode(argv.direccion)
        .then(resp => resp)
        .catch(err => console.log(err));

    if (!geolocalizacion) {
        throw new Error(`No se pudo obtener la geolocalización para ${direccion}`);
    }

    let temperatura = clima.getClima(geolocalizacion.latitude, geolocalizacion.longitude)
        .then(resp => resp)
        .catch(console.log);

    if (!temperatura) {
        throw new Error(`No se pudo obtener la temperatura para ${direccion} con lat: ${geolocalizacion.latitude} y long: ${geolocalizacion.longitude}`);
    }

    return temperatura;

}

getInfoV2 = async(direccion) => {
    try {
        let geolocalizacion = await lugar.getLugarLatLngGeoCode(argv.direccion);
        let temperatura = await clima.getClima(geolocalizacion.latitude, geolocalizacion.longitude);
        return `La temperatura en ${direccion} es de ${temperatura}º`;
    } catch (e) {
        return `No se pudo determinar la temperatura de ${direccion}`;
    }

}

// getInfo(argv.direccion)
//     .then(console.log)
//     .catch(console.log);

getInfoV2(argv.direccion)
    .then(console.log)
    .catch(console.log);