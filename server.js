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
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './public')));

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/natural-beauty', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


process.env.NODE_ENV === "production" ?
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0-314sb.mongodb.net/natural-beauty?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }) :
  mongoose.connect('mongodb://localhost:27017/natural-beauty', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(session({
  secret: 'sessionKey7h%wvyjg*wr7',
  store: new MongoStore({ mongooseConnection: db })
}));

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));


/* API ENDPOINTS */
app.use('/api', require('./routes/products.routes'));
app.use('/api', require('./routes/order.routes'));
app.use('/api', require('./routes/cart.routes'));

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ data: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, './client/build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
