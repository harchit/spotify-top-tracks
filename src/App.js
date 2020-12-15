import logo from './logo.svg';
import React from 'react';
import {useState} from 'react';
import {composableMap, Graticule, ZoomableGroup, Annotation} from 'react-simple-maps';
import './App.css';
import ReactTooltip from 'react-tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'; 
import {Button, Popover} from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import {useQuery, ReactQueryCacheProvider, QueryCache} from 'react-query';
import Loader from './Loader'
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere
} from "react-simple-maps"
import { PopoverContent } from 'react-bootstrap';
import * as fetch from 'node-fetch';
import MapChart from './MapChart';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
const queryCache = new QueryCache();

function App() {
  const [content, setContent] = useState("");
 
  return (
    //<ReactQueryCacheProvider queryCache={queryCache}>

    <div className="App">
        <h3 style={{color: "#1ED760"}}> Top Spotify Tracks by Country </h3>
        <t style={{color: "white"}}> Hover over country to view top daily spotify track <br/> click to view </t>
        
          {  <MapChart className="map" setTooltipContent={setContent} />}
        <span className="me"> created by Harchit Bhatoia </span>
        <span style={{color: "white"}}> powered by{" "}    
          <a style={{color: "lightblue"}} href="https://developer.spotify.com/documentation/web-api/">
            spotifyAPI
          </a>
        </span>
        <ReactTooltip html={true}>{content}</ReactTooltip>
    </div>

    //</ReactQueryCacheProvider>
  );
}

export default App;
