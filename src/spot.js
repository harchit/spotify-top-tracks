//const fetch = require("node-fetch");
import pkg from 'react-query';
const {useQuery} = pkg;

function getData(){
  const {isLoading, data} = useQuery('repoData', ()=>
    fetch('https://raw.githubusercontent.com/wobsoriano/spotify-charts-map/master/data/spotifycharts.json')
    .then(res=> res.json())
    .then(data=> console.log(data))
  )

}
console.log(getData());

