const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const { where } = require("sequelize");
const {emailjs}=require('emailjs-com');
const axios = require('axios');
function isTested(tester,testeur){
     if (tester!==testeur) return false;
     return true
}
const add_admins = async (req, res) => {
  const { userName, mail, password, privilege } = req.body;
 console.log( { userName, mail, password, privilege });
 console.log(req.body);
  // Basic validation
  if (!userName || !mail || !password || !privilege) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ where: { mail } });
    if (existingAdmin) {
      console.log('Email already exists:', mail);
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newUser = await Admin.create({
      userName: userName,
      mail: mail,
      password: hashedPassword,
      privilege: isTested('master_admin',privilege),
    });

    // Optionally generate a JWT token if you need to
    res.status(200).json({ success: true, message: 'all thing is good' });
    const data = {
      service_id: 'service_sjipn3q',
      template_id: 'template_cb67ebf',
      template_params: {
        'username': 'James',
        // Add any other parameters your template requires
      },
    };
    
    axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Email sent:');
      })
      .catch(error => {
        console.error('Error sending email:');
      });
   
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
// modifier admin

const change_admin=async (req,res)=>{
  try{
      
       const dataTochange=req.body;
       console.log(dataTochange);
       const changed=await Admin.update(
        dataTochange,
        {where :{
          id : parseInt(dataTochange.id),
        }
      }
       );
      const token = sign({ id: dataTochange.id  }, 'abdellah', { expiresIn: '1h' });
    res.status(201).json({ success: true, message: 'info admin changed successfully', token });
  }catch(error){
    res.status(500).json({ success: false, message: 'erreur', token });
    console.log(error);
  }
}



//get admins
const get_admin = async (req, res) => {
    try {
      const admins = await Admin.findAll();
      console.log(admins);
      res.status(200).json({ success: true, message: 'Admins retrieved successfully', admins });
    } catch (error) {
      console.error('An error occurred:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  };
//delete admin 
const delete_admin= async (req,res)=>{
      const result=req.body;
      try {
        if (result.prev==='master admin'){
          res.status(205).json({success : true , message : 'cant delete a master admin'});
          return 
           }
          const admin=await Admin.destroy(
                 {
                  where : { id : result.id}
                 }
                 
          );
          res.status(200).json ({ success : true ,message : 'the admin deleted succeessfuly'});
          console.log(admin);
      }catch(error){
           res.stetus(500).json({success:false,message : 'admin don\'t deleted'})
      }
}
  

// blocked admin 
const blocked_admin= async (req,res)=>{
  const result=req.body;
  console.log('ok');
  console.log(result);
  if (result.prev){
    return res.status(404).json({success:true , message:'cant blocked this acout'})
  }
      try {
        const admin= await Admin.update(
          {
            stoped : result.stopped,
          },
          {where : {
               id :result.id,
          }
        }
        );
        console.log(admin);
        res.status(200).json({success : true,message :'stoped succesfuly'});
      }
   
      catch(error){
        console.log('weee');
        res.status(500).json({success : true,message :'erreur'});xa
      }
      
}
module.exports = {
  add_admins,
  get_admin,
  change_admin,
  delete_admin,
  blocked_admin,
};
