const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKey = "tyhlei3Sml";

const generateJwt = (user) => {
  const payload = {username: user.username};
  return jwt.sign(payload,secretKey,{expiresIn : '1h'});
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const {username,email,password} = req.body;
  const adminExists = ADMINS.find(a => a.email === email && a.username === username);
  if (adminExists) {
    res.status(400).json({message : 'Admin already exists'});
  } else {
    const admin = {username,password};
    const token = generateJwt(admin);
    ADMINS.push(admin);
    res.status(200).json({message:'Admin created succesfully',token});
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username,email,password} = req.header;
  const adminExists = ADMINS.find(a => a.username === username && a.password === password);
  if (adminExists) {
    const token = generateJwt(admin);
    res.status(200).json({message:'Logged in successfully',token});
    next();
  } else {
    res.status(404).json({message:'Authentication error'})
  }


});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
