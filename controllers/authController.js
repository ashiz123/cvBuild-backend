const bcrypt = require('bcryptjs');
const {getToken, getUserByEmail, insertUser, getAuth}  = require('../services/authService');




//register user 
const register = async(req, res, next) => {
 
    const { first_name, last_name, email, password } = req.body;
    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({error : 'All fields required'});
     }
     const hashedPassword = await bcrypt.hash(password, 10);

     try{
        userId = await insertUser(first_name, last_name, email, hashedPassword);
        res.status(201).json({message: 'User inserted successfully', userId});

     }

     catch(err)
     {
        console.log('error during registeration', err.stack);
        throw new Error('User not registered');
     }
    }




//login user
const login =  async (req, res, next) =>  {

    const { email, password } = req.body;
    
    try {
      const user = await getUserByEmail(email);
      if(!user)
        {
          console.log('user not found');
          return res.status(401).json({messasge: 'User not found'});
        }
  
        //if password not matched
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
        console.log("Password does not match");
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      //creating token
      const token = getToken(user.id);
      res.json({ token });
  
    } 
    catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Server error' });
    }
  
  }


  const getLoggedInUser = async(req, res) => {
    const auth = await getAuth(req.userId);
    res.json(auth);
  }


  

  module.exports = {login, register, getLoggedInUser};