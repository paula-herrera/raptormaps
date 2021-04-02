import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import MAPBOX_ACCESS_TOKEN from '../config/mapbox_access_token';
import moment from 'moment';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN.MAPBOX_ACCESS_TOKEN;

const Map = ({techData}) => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-115.5981);
  const [lat, setLat] = useState(32.6748);
  const [zoom, setZoom] = useState(15);

  // Create map and update everytime new TechData is recieved
  useEffect(() => {
    createMap();
  }, [techData]);

  const createMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom
    });

    techData.features.forEach(function(marker) {
      // // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          '<h3>' + marker.properties.name + '</h3><p> Location Last Updated: ' + moment.unix(marker.properties.tsecs).format('MMMM Do YYYY, h:mm:ss a') + '</p>'
        ))
        .addTo(map);
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
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

export default Map;


