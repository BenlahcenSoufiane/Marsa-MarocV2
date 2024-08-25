const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {generateToken} = require('../auth')
const User = require('../models/User');
const ExcelJS = require('exceljs');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');


//SIGN UP//
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


// ADD BOOK //
const addUser = async (req, res) => {
  const { MLE, Name, fonction} = req.body;

  try {
    const newUser = await User.create({ MLE, Name, fonction});
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'An error occurred while adding the users.' });
  }
};

const getAllUser = async (req, res) => {
  const { shift } = req.query; // Get the shift number from the query parameters

  try {
    let users;

    if (shift) {
      // If a shift number is provided, filter the users by shift
      users = await User.findAll({
        where: {
          shift: shift
        }
      });
    } else {
      // If no shift number is provided, return all users
      users = await User.findAll();
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};





//GET USER BY ID //
const getUserId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: ' Not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred while fetching the users.' });
    }
  };



//USER UPDATE//
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { MLE, Name, fonction, Affectation_Initiale, Affectation_Finale, Observation } = req.body;

  try {
      const user = await User.findOne({ where: { MLE } });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      if (user.id !== parseInt(id, 10)) {
          return res.status(400).json({ error: 'ID does not match the MLE' });
      }

      user.Name = Name;
      user.fonction = fonction;
      user.Affectation_Initiale = Affectation_Initiale; // Updated to match model
      user.Affectation_Finale = Affectation_Finale;
      user.Observation = Observation;

      await user.save();

      res.status(200).json({ success: true, message: 'User profile updated successfully', user });
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'An error occurred while updating user profile.' });
  }
};






//DELETE USER //
const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
  };

//USER  COUNT//
const countUser = async (req, res) => {
    try {
      const usersCount = await User.count();
      res.status(200).json({ usersCount });
    } catch (error) {
      console.error('Error fetching users count:', error);
      res.status(500).json({ error: 'An error occurred while fetching the users count.' });
    }
  };


// Controller function to export users to an Excel file


const exportUsers = async (req, res) => {
  try {
      const shifts = [1, 2, 3];
      const workbook = new ExcelJS.Workbook();

      for (const shift of shifts) {
          const worksheet = workbook.addWorksheet(`Shift ${shift}`);
          const users = await User.findAll({ where: { Shift: shift } });

          // First Line Empty
          worksheet.addRow([]);

          // Second Line: Custom Text
          const titleRow = worksheet.addRow(['AFFECTATION DES MOYENS HUMAINS']);
          titleRow.font = { size: 20, bold: true };
          worksheet.mergeCells('A2:G2'); // Adjust according to the number of columns

          // Add 3 Empty Rows Below the Title
          worksheet.addRow([]);
          worksheet.addRow([]);
          worksheet.addRow([]);

          // Column Headers (start from row 6)
          const headers = ['id', 'MLE', 'Name', 'fonction', 'Affectation_Initiale', 'Affectation_Finale', 'Observation'];
          const headerRow = worksheet.addRow(headers);
          headerRow.eachCell((cell) => {
              cell.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '00FFFF' }, // Cyan color
              };
              cell.font = { size: 14, bold: true }; // Increase font size
              cell.alignment = { horizontal: 'center' }; // Center text
          });

          // Adding the data
          users.forEach(user => {
              worksheet.addRow([user.id, user.MLE, user.Name, user.fonction, user.Affectation_Initiale, user.Affectation_Finale, user.Observation]);
          });

          // Function to adjust column widths
          const adjustColumnWidths = () => {
              headers.forEach((header, index) => {
                  let maxLength = header.length;
                  worksheet.getColumn(index + 1).eachCell({ includeEmpty: true }, (cell) => {
                      const cellValue = cell.text ? cell.text : cell.value;
                      if (cellValue && cellValue.toString().length > maxLength) {
                          maxLength = cellValue.toString().length;
                      }
                  });
                  worksheet.getColumn(index + 1).width = maxLength + 2; // Add some padding
              });
          };

          // Adjust column widths to fit content
          adjustColumnWidths();
      }

      const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const dirPath = path.join('C:', 'Users', 'TUF', 'Documents', 'exports');
      const filePath = path.join(dirPath, `users_by_shifts_${today}.xlsx`);

      // Ensure the directory exists
      if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
      }

      await workbook.xlsx.writeFile(filePath);

      res.download(filePath, `users_by_shifts_${today}.xlsx`, (err) => {
          if (err) {
              console.error('Error downloading file:', err);
              res.status(500).json({ error: 'An error occurred while downloading the file.' });
          }

          // Optionally, delete the file after sending it to the client
          fs.unlink(filePath, (err) => {
              if (err) console.error('Error deleting file:', err);
          });
      });
  } catch (error) {
      console.error('Error exporting users:', error);
      res.status(500).json({ error: 'An error occurred while exporting users.' });
  }
};





  module.exports = {
    exportUsers,
    signup,
    getAllUser,
    deleteUser,
    addUser,
    countUser,
    updateUser,
    getUserId,
  };
  