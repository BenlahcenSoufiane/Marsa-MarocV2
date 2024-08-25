const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {generateToken} = require('../auth')
const User = require('../models/User');
const Admin = require('../models/Admin');

const signup = async (req, res) => {
    const { email, password, role, firstName, lastName } = req.body;
  
    console.log('Signup request received:', { email, role, firstName, lastName });
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log('Email already exists:', email);
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword, role: role || 'user', firstName, lastName });
  
      console.log('New user created:', newUser);
      res.status(201).json({ success: true, message: 'User added successfully', user: newUser });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  };

  //LOGIN//
  const login =  async (req, res) => {
    const { username, password } = req.body;
    
    console.log('Login request received:', { username, password }); // For debugging
    
    try {
      const admin = await Admin.findOne({ where: { username } });
      if (!admin) {
        console.log('User not found:', admin);
        return res.status(404).json({ success: false, message: 'Admin not found' });
      }
  
      console.log('Retrieved user from database:', admin.password); // For debugging
      
      if (!password) {
        console.log('Password not provided');
        return res.status(400).json({ success: false, message: 'Password not provided' });
      }
      //NB: SHOULD ADD BYCRIPT LATER
      const passwordMatch = (password === admin.password);

      console.log('Password match:', passwordMatch); // For debugging
      
      if (!passwordMatch) {
        console.log('Incorrect password for user:', admin);
        return res.status(401).json({ success: false, message: 'Incorrect password' });
      }
  
      const token = generateToken({ id: admin.id,username:admin.username });
      console.log('User logged in successfully:', username); // For debugging
      res.status(200).json({ success: true, token}); // Include the role in the response
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  };

  module.exports = {
    signup,
    login,
  };