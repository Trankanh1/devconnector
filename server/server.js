global.appDir = __dirname;
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000
connectDB();
/**
 * Init Middleware 
 */
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send("API running"));

//Define route
app.use('/api/users', require('./src/routes/api/users'));
app.use('/api/auth', require('./src/routes/api/auth'));
app.use('/api/posts', require('./src/routes/api/posts'));
app.use('/api/profile', require('./src/routes/api/profile'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));