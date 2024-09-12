
const connection = require('../configs/db');

const personalInformation = async(req, res) => {
    const user_id = req.userId;
    try{
        const [user] = await connection.query('SELECT * FROM users WHERE id = ? ORDER BY created_at DESC LIMIT 1', [user_id]);
        const [profile] = await connection.query('SELECT * FROM user_profiles WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [user_id]);

        res.status(200).json({
            user,
            profile
        });
    }

    catch(error){
         console.error('error' , error);
    }
}


const userQualifications = async(req, res) => {
    const user_id = req.userId;

    try{
        const [qualification] = await connection.query('SELECT * FROM user_qualifications WHERE user_id = ? ORDER BY created_at DESC ', [user_id]);

        res.status(200).json({
            qualification
        });
    }

    catch(error){
        console.error('error', error);
    }
   
}

const userSkills = async(req, res) => {
    const user_id = req.userId;

    try{
        const [skills] = await connection.query('SELECT * FROM user_skills WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [user_id]);

        res.status(200).json({
            skills
        });
    }

    catch(error){
        console.error('error', error);
    }
   
}

const userExperiences = async(req, res) => {
    const user_id = req.userId;

    try{
        const [experiences] = await connection.query('SELECT * FROM user_experiences WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [user_id]);

        res.status(200).json({
            experiences
        });
    }

    catch(error){
        console.error('error', error);
    }
   
}



module.exports = {personalInformation, userQualifications, userSkills, userExperiences}