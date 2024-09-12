const jwt = require('jsonwebtoken');
const SECRET_KEY =  process.env.SECRET_KEY;
const connection = require('../configs/db');
const {storePersonalInfo, storeExperiences, storeQualifications, storeSkills} = require('../services/cvService');
const { validationResult} = require('express-validator');







 const storeCv =  async(req, res, next) => {

  const {auth, personalInfo, skills, qualifications, jsonExperiences} = req.body
  if(!auth)
  {
    res.status(200).json({message : 'No user authenticated'});
  }

  const auth_id = auth.id;
  console.log('auth:', auth_id);

  let connect;
    try{
      //  start transaction
      connect = await connection.getConnection();
      await connect.beginTransaction();

      await storePersonalInfo(auth_id, personalInfo);
      await storeSkills(auth_id, skills);
      await storeQualifications(auth_id, qualifications);
      await storeExperiences(auth_id, jsonExperiences);

      // commit
      await connect.commit();
      console.log('Transaction committed successfully');
  
      res.status(200).json({
        message: 'Data stored successfully',
        user_id : auth_id
      });
    }
    catch(error){
        // Rollback if something goes wrong
        if(connect){
          await connect.rollback();
        }
      
      console.error('Error storing CV:', error);
      res.status(500).json({ message: 'Failed to store CV', error: error.message });
    }
    finally {
      // Release the connection back to the pool
      if(connect)
      {
        connect.release();
      }
      
    }
  }




  const getAllCv = async(req, res, next) => {

    const user_id = req.userId;
   
    try{
      const [profile ] = await connection.query('SELECT * FROM user_profiles WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [user_id]);
      const [qualifications] = await connection.query('SELECT * FROM user_qualifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [user_id]);
      const [skills] = await connection.query('SELECT * FROM user_skills WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [user_id]);
      const [experiences] = await connection.query('SELECT * FROM user_experiences WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [user_id]);

      res.status(200).json({
        profile, 
        qualifications, 
        skills, 
        experiences
      })

    }


    catch(error){
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Server error' });
    }
 }

  

  
   
  
 


module.exports = {storeCv, getAllCv}