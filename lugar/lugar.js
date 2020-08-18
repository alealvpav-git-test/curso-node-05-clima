const axios = require('axios');
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: '6e3ec0bef71b483ea7b111d62958b17d'
})

const getLugarLatLngGeoCode = async(dir) => {
    let response = await geocoder.geocode(dir);
    if (!response) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    result = response[0];

    return {
        direccion: result.city,
        longitude: result.longitude,
        latitude: result.latitude
    };
}

module.exports = {
    getLugarLatLngGeoCode
}