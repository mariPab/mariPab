const express = require('express');
const cors = require('cors');
const path = require('path');
// const mongoose = require('mongoose');

// const customRoutes = require('./routes/custom.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
// app.use('/api', customRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ data: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
