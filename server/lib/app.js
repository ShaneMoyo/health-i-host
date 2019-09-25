const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
const ensureAuth = require('./utils/ensure-auth')();


app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());

const auth = require('./routes/auth');
const appointments = require('./routes/appointments');
const users = require('./routes/users');

app.use('/api/auth', auth);
app.use('/api/users', ensureAuth, users);
app.use('/api/appointments', ensureAuth, appointments);
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, './public', 'index.html'));
});
app.use(errorHandler());

module.exports = app;
