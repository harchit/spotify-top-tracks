const fetch = require('node-fetch');

const fetchCountries = async () =>{
    const res = await fetch('https://raw.githubusercontent.com/wobsoriano/spotify-charts-map/master/data/spotifycharts.json');
    return res.json();
}
console.log(fetchCountries);