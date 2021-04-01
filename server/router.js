const express = require('express');
const { ModuleFilenameHelpers } = require('webpack');
let router = express.Router();
const controllers = require('./controller');

router
  .route('/:solar_farm_id/technicians')
  .get((req, res) => {
    controllers.getData(req, res);
  })

module.exports = router;