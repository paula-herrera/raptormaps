const express = require('express');
const router = require('./router');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(express.static(__dirname + './../dist'));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});