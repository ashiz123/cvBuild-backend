//import mysql
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const util = require('util');

dotenv.config();

//write connection
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yankee123',
    database: 'express_app',
    port: '3306'
  });

async function testConnection(){
    try{
      const conn =  connection.getConnection();
      const [rows] =  await conn.query('SELECT * FROM users');
      conn.release();

      console.log('Connection to the database was successful!');
      return true;
    }
    catch(error)
    {
      console.error('Error connection to database', error);
      return false;
    }
  }



 

  



module.exports = connection;  

