const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// register
authController.post('/register', async(req, res) => {
    try {
      const isExisting = await User.findOne({email: req.body.email})  
      if(isExisting){
        throw new Error("Already such an account with this email. Try a new one!")
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const newUser = await User.create({...req.body, password: hashedPassword})
      const {password, ...others} = newUser._doc
      const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5h'})

      return res.status(201).json({others, token})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
// Login
authController.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        throw new Error("User credentials are wrong!");
      }
  
      const password = req.body.password;
  
      if (!password) {
        throw new Error("Password is required for login.");
      }
  
      console.log('User found:', user);
      console.log('Provided password:', password);
      console.log('User password:', user.password);
  
      // Uncomment the next line once debugging is complete
      const comparePass = await bcrypt.compare(password, user.password);
  
      // For debugging, return user details without comparing passwords
      const { password: _, ...others } = user._doc;
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '5h' });
  
      // Uncomment the next line once debugging is complete
      return res.status(200).json({ ...others, token });
  
      // Temporary response for debugging purposes
      // return res.status(200).json({ debug: 'Check console logs for details' });
    } catch (error) {
      console.error('Error in login route:', error);
      return res.status(500).json({ error: error.message });
    }
  });
  
module.exports = authController
