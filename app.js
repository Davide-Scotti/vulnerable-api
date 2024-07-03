const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const rateLimiter = require('./middleware/rateLimiter');
const csrfProtection = require('./middleware/csrfProtection');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/vulnerable-api');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(rateLimiter);
app.use(csrfProtection);

app.set('view engine', 'ejs');  // Usare EJS come template engine
app.set('views', path.join(__dirname, 'views'));

app.use('/users', userRoutes);

// Route di base
app.get('/', csrfProtection, (req, res) => {
    res.render('index', { csrfToken: req.csrfToken() });
});

app.listen(3000, () => console.log('Server running on port 3000'));
