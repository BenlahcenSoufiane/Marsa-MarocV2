// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { generateToken, verifyToken } = require('./auth');
const sequelize = require('./sequelize');
const User = require('./models/User');
const Admin = require('./models/Admin');


const userRoutes = require('./routes/user_routes')
const authRoutes = require('./routes/auth_routes');
const app = express();

const PORT =  3000;

app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database:', err);
  });


  app.use('', authRoutes);
  app.use('', userRoutes);





app.use(express.static(path.join(__dirname, 'gestion-bibliotheque-client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/gestion-bibliotheque-client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
