import React, { memo, useEffect, useState } from "react";
import {useQuery} from 'react-query';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const chartsURL = 'https://raw.githubusercontent.com/wobsoriano/spotify-charts-map/master/data/spotifycharts.json';
//   const fetchCountries = async () =>{
//     const res = await fetch('https://raw.githubusercontent.com/wobsoriano/spotify-charts-map/master/data/spotifycharts.json');
//     return res.json();
// }

 


const MapChart = ({ setTooltipContent}) => {

    //const {isLoading, data} = useQuery('repoData', fetchCountries);
    //console.log("printed " + data);
    const [data, setData] = useState('');
    useEffect(()=>{
        const d = fetch(chartsURL)
        .then(res=>res.json())
        .then(data=> setData(data))
        .then(data=>console.log(data));

        ReactTooltip.rebuild();
        
    }, []);  

    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  return (
    <>
      <ComposableMap style={{maxHeight:"84vh"}} height="500" data-tip="" >
        
        <Graticule strokeWidth={0.5} stroke="#FFFFFF" step={[15,15]}/>
        <Sphere stroke="#FFFFFF" strokeWidth={0.5}/>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const exists = Object.keys(data).find((i)=> i === geo.properties.ISO_A2); 
                return ( 
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, ISO_A2 } = geo.properties; 
                    if(exists){
                        ReactTooltip.rebuild();
                        const countryData = data[ISO_A2];
                        setTooltipContent(
                         `${NAME}<br/>
                         Song: ${countryData.trackName}<br/>
                         Artist: ${countryData.artist}<br/>
                         Today's Streams: ${Intl.NumberFormat().format(countryData.streams)} `);
                    }   
                  }}
                  onClick={()=>{
                      
                      if (exists){
                          const {url} = data[geo.properties.ISO_A2];
                          const w = window.open(url, "_blank");
                          w.focus();
                      }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  
                  strokeWidth={0.4}
                  stroke="#000000"
                  style={{
                    default: {
                      fill: exists? "#1ED760":"#000" ,
                      outline: "000000",
                
                    },
                    hover: {
                      fill: exists? "#1ce865": "#000",
                      outline: "none",
                      cursor: exists? "pointer": "auto"
                    },
                  }}
                />
                );
            })
            }
          </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
