const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

//file imports
const { errorHandler } = require('../backend/Middleware/ErrorMiddleware');
const connectDB = require('../backend/Config/db');

//vars
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors('*'));

//routes
app.use('/api/posts', require('./Routes/PostRoutes'));
app.use('/api/treks', require('./Routes/TrekRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/favorites', require('./routes/FavoriteRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
