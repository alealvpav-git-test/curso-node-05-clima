const axios = require('axios');
const apiKey = '9acae1e18713b45de144e3a96a8146d5';

const getClima = async(lat, long) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`);
    // console.log('response', response.data);
    return response.data.main.temp;
}

module.exports = {
    getClima
}