
const connection = require('../configs/db');


 const createTables = async() => {
    const createUserTable = `
            CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`;
            

  const createUserProfileTable = `
        CREATE TABLE user_profiles (
          user_id INT REFERENCES users(user_id),
          phone_number VARCHAR(20),
          address TEXT,
          job_title TEXT,
          profile TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;

      
  const createQualificationsTable = `
            CREATE TABLE IF NOT EXISTS user_qualifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            university VARCHAR(255) NOT NULL,
            field_of_study VARCHAR(255) NULL,
            completed_from VARCHAR(255) NULL,
            level VARCHAR(255) NOT NULL,
            start_year DATE NOT NULL,
            end_year DATE NOT NULL,
            detail TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;


    const createSkillsTable  = `
            CREATE TABLE user_skills (
            skill_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT REFERENCES users(user_id),
            skill_name VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

    const createExperiencesTable = `CREATE TABLE user_experiences(
            id int AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            company_name VARCHAR(100),
            title VARCHAR(50),
            skill_earned JSON,
            detail TEXT,
            start_year DATE NOT NULL,
            end_year DATE,
            FOREIGN KEY (user_id) REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`


  try{
    await connection.query(createUserTable);
    await connection.query(createUserProfileTable);
    await connection.query(createQualificationsTable);
    await connection.query(createSkillsTable);
    await connection.query(createExperiencesTable);
  }

    catch(error){
      console.log('Error while creating table', error);
   }};


  //   await connection.query(createUserTable, (err, results) => {
  //     if(err){
  //         console.log('Error created creating table:', err.stack)
  //     }else{
  //         console.log('User table created successfully.');
  //     }
  // });

  // await connection.query(createQualificationsTable, (err, results) => {
  //     if (err) {
  //       console.error('Error created posts table:', err.stack);
  //     } else {
  //       console.log('Qualifications table created successfully.');
  //     }
  //   });

  //   await connection.query(createUserProfileTable, (err, results) => {
  //   if(err)
  //     {
  //       console.error('Error created while creating profile table:', err.stack)
  //     }else{
  //       console.log('User profile table created successfully');
  //     }
  // })

  // await connection.query(createSkillsTable, (err, results) => {
  //   if(err){
  //     console.error('Error created while creating user skills table : ', err.stack);
  //   }else{
  //     console.log('User skill table created successfully');
  //     }
  //   })


  //   await connection.query(createExperiencesTable, (err,results) => {
  //     if(err){
  //       console.error('Error created while creating user skills table : ', err.stack);
  //     }else{
  //       console.log('User skill table created successfully');
  //       }
  //     })

   

  
       
        
  const dropTables = async() => {
  
    const dropQualificationsTable = `DROP TABLE IF EXISTS user_qualifications;`;
    const dropUsersTable = `DROP TABLE IF EXISTS users;`;
    const dropUserProfileTable = `DROP TABLE IF EXISTS user_profiles`;
    const dropUserExperiencesTable = `DROP TABLE IF EXISTS user_experiences`;
    const dropUserSkillsTable = `DROP TABLE IF EXISTS user_skills`;
  
    try{
      await connection.query(dropQualificationsTable);
      await connection.query(dropUserProfileTable);
      await connection.query(dropUserExperiencesTable);
      await connection.query(dropUserSkillsTable);
      await connection.query(dropUsersTable);
      console.log('All table dropped successfully');
    }

    catch(error){
      console.error('Error dropping  table:', error);
    }

  };


module.exports = {
    createTables,
    dropTables
  };