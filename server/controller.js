const technicianData = require('../data/api_technician_response_data.json')

let controllers = {
  getData: (req, res) => {
    // for now just sending back one set of data
    res.status(200).send(technicianData[0]);
  }
}

module.exports = controllers;