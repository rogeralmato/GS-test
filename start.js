require('dotenv').config();
const mongoose = require('mongoose');
const mysql = require('mysql');

const app = require('./app');

const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'alma1234',
  database: 'goldenspear'
});

// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;


const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
 
