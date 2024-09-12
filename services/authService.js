const jwt = require('jsonwebtoken');
const SECRET_KEY =  process.env.SECRET_KEY;
const connection = require('../configs/db');


const getUserByEmail =  async(email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.query(query, [email]);
    console.log("Query result:", rows);
    return rows.length > 0 ? rows[0] : null;
}



const insertUser = async(first_name, last_name, email, password) => {
    const query = 'INSERT INTO users(firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    try{
        const [results] = await connection.query(query, [first_name, last_name, email, password]);
        return results.insertId;
    }
    catch(err)
    {
        console.log('error in inserting in database', err.stack);
        throw new Error('database insertion error');
    }
    };
    


const getToken = (userId) => {
   return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
  
}


const getAuth = async(userId) => {
  const query = "SELECT id, firstname, lastname, email FROM users WHERE id  = ?";
  const [rows] = await connection.query(query, userId);
  return rows;
}



module.exports = {getToken, getUserByEmail, insertUser, getAuth}