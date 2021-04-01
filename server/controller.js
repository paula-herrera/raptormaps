const testData = require('../data/api_technician_response_data.json')

let controllers = {
  getData: (req, res) => {
    res.status(200).send(testData);
  }
}

module.exports = controllers;