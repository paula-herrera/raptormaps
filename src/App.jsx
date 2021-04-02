import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Map from './Map';

const App = ({initialData}) => {
  const [techData, setTechData] = useState(initialData)

  const getTechData = () => {
    axios.get('http://localhost:5000/api/v1/solar_farms/3456/technicians')
      .then(technicianData => setTechData(technicianData.data));
  }
  // getTechData();

  return (
    <div className="main">
      <Map techData={techData} />
    </div>
  );
}

export default App;


