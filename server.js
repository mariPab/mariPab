const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/client')));

if (process.env.NODE_ENV === 'production') app.use(express.static('client/build'));

/* START SERVER */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

/* API ENDPOINTS */
app.use('/api', require('./routes/products.routes'));
app.use('/api', require('./routes/order.routes'));
app.use('/api', require('./routes/cart.routes'));

/* REACT WEBSITE */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'), err => {
    if (err) res.status(500).send(err);
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'not found...' });
});

/* MONGOOSE */
process.env.NODE_ENV === "production" ?
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0-314sb.mongodb.net/NaturalBeauty?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }) :
  mongoose.connect('mongodb://localhost:27017/natural-beauty', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

app.use(session({
  secret: 'sessionKey7h%wvyjg*wr7',
  store: new MongoStore({ mongooseConnection: db })
}));

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

module.exports = server;