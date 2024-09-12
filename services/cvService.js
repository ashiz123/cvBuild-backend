const connection = require('../configs/db');



  //user_id = auth_id
  const storePersonalInfo = async (auth_id, personalInfo) => {
    try{
      await connection.query('INSERT INTO user_profiles(user_id, phone_number, address, job_title, profile ) VALUES (?, ?, ?, ?, ?)', 
        [auth_id, personalInfo.phone, personalInfo.address, personalInfo.jobtitle, personalInfo.profile]);
       console.log('User profile created successfully');
    }
    catch(error)
    {
      console.error('Error: ', error);
    }
    }
  
   
  
    const storeQualifications = async(auth_id,  qualifications) => {
      try{
        for (const qualification of qualifications){
          await connection.query(
            'INSERT INTO user_qualifications(user_id, university, field_of_study, completed_from, level, start_year, end_year , detail ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
             [auth_id, qualification.university, qualification.field_of_study, qualification.completed_from,qualification.level, qualification.start_year, qualification.end_year, qualification.detail]
          )
        }
      }
      catch(error){
        console.error('Error:', error)
      }
      
    }
  
  
    const storeSkills =  async( auth_id, skills) => {
      try{
        for(const skill of skills){
          await connection.query(
           'INSERT INTO user_skills(user_id, skill_name) VALUES (?, ?)', [auth_id, skill.skill_name]
          )
       }
      }
      catch(error){
        console.error('Error:', error);
      }
      
    }
  
    
  
  
    const storeExperiences = async( auth_id, experiences) => {
      try{
        for(const experience of experiences)
          {
            console.log(experience);
            await connection.query(
              'INSERT INTO user_experiences(user_id, company_name, title, skill_earned, detail, start_year, end_year ) VALUES (?, ?, ?, ?, ?, ?, ?)', 
              [auth_id, experience.company_name, experience.title, experience.skill_earned, experience.detail, experience.start_year, experience.end_year]
            )
          }
      }
      catch(error){
        console.error('Error:', error)
      }
     
    }

    module.exports = {storePersonalInfo, storeExperiences, storeQualifications, storeSkills}