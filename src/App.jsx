import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import MAPBOX_ACCESS_TOKEN from '../config/mapbox_access_token';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN.MAPBOX_ACCESS_TOKEN;

const App = () => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-115.5959);
  const [lat, setLat] = useState(32.6744);
  const [zoom, setZoom] = useState(12);
  const [technicians, setTechnicians] = useState({
    "features": [
  { "type": "Feature", "properties": { "id": 0,  "name": "Tech 3", "tsecs": 1592078400, "bearing": 0 }, "geometry": { "type": "Point", "coordinates": [ -115.606391900599817, 32.673693943392962 ] } },
  { "type": "Feature", "properties": {  "id": 0,  "name": "Tech 1", "bearing": 87.0, "tsecs": 1592078400  }, "geometry": { "type": "Point", "coordinates": [ -115.585908073767968, 32.679083641964432 ] } },
  { "type": "Feature", "properties": { "id": 0,   "name": "Tech 2", "bearing": 270, "tsecs": 1592078400 }, "geometry": { "type": "Point", "coordinates": [ -115.590876702138573, 32.676567128293193 ] } }
    ]
  }, {
    "features": [
  { "type": "Feature", "properties": { "id": 1,  "name": "Tech 3", "tsecs": 1592078460, "bearing": 181 }, "geometry": { "type": "Point", "coordinates": [ -115.606424296348351, 32.673506838070466 ] } },
  { "type": "Feature", "properties": {  "id": 1,  "name": "Tech 1", "bearing": 90.0, "tsecs": 1592078460  }, "geometry": { "type": "Point", "coordinates": [ -115.585937796370388, 32.678043350879868 ] } },
        { "type": "Feature", "properties": { "id": 1,   "name": "Tech 2", "bearing": 181, "tsecs": 1592078460 }, "geometry": { "type": "Point", "coordinates": [ -115.590842025769078, 32.676527498156638 ] } }
    ]
  }, {
    "features": [
  { "type": "Feature", "properties": { "id": 2,  "name": "Tech 3", "tsecs": 1592078520, "bearing": 180 }, "geometry": { "type": "Point", "coordinates": [ -115.606424296348351, 32.673059210311912 ] } },
  { "type": "Feature", "properties": {  "id": 2,  "name": "Tech 1", "bearing": 271,  "tsecs": 1592078520  }, "geometry": { "type": "Point", "coordinates": [ -115.586165669655585, 32.678043350879868 ] } },
        { "type": "Feature", "properties": { "id": 2,   "name": "Tech 2", "bearing": 182, "tsecs": 1592078520 }, "geometry": { "type": "Point", "coordinates": [ -115.590861840837363, 32.676527498156638 ] } }
    ]
  });

  useEffect(() => {
    createMap();
    getTechData();
  }, []);

  const createMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    technicians.features.forEach(function(marker) {
      // // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });



    return () => map.remove();
  }

  const getTechData = () => {
    axios.get('http://localhost:5000/api/v1/solar_farms//:solar_farm_id/technicians')
      .then(technicianData => setTechnicians(technicianData.data))
      .then(console.log(zoom));
  }

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
}

export default App;


