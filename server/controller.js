const technicianData = require('../data/api_technician_response_data.json')

// Using counter to send cycle through datasets each
// time data is requested to simulate "real time"
// updates.
let dataset = 0;

let controllers = {
  getData: (req, res) => {
    res.status(200).send(technicianData[dataset]);

    if (dataset === 15) {
      dataset = 0;
    } else {
      dataset++;
    }
  }
}

module.exports = controllers;