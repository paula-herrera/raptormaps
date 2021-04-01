const express = require('express');
const { ModuleFilenameHelpers } = require('webpack');
let router = express.Router();
const controllers = require('./controller');

router
  .route('/test')
  .get((req, res) => {
    controllers.getData(req, res);
  })

module.exports = router;