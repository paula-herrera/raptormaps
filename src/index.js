import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import axios from 'axios';

axios.get('http://localhost:5000/api/v1/solar_farms/3456/technicians')
      .then(technicianData => {
        var initialData = technicianData.data
        ReactDOM.render(<App initialData={initialData}/>, document.getElementById('app'));
      });

