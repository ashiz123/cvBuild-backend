const express = require('express');
const router = express.Router();
const {createTables, dropTables} = require('../migrations/initialMigration');

// http://localhost:3001/migrate/up- to migrate table
// http://localhost:3001/migrate/down - to drop table


router.get('/up', async(req, res) => {

    try{
     await createTables();
     res.status(200).json({message : 'table created successfully'});
    }

    catch(error){
        console.error('Error during creating migration:', error);
        res.status(500).send('Migration create failed'); 
    }
    
})


router.get('/down', async(req, res) => {
    console.log('trying dropping');
   

    try{
        await dropTables();
        res.send('Migration drop completed');
    }

    catch(error){
        console.error('Error during dropping migration:', error);
        res.status(500).send('Migration drop failed');   
    }
   
})



  
  module.exports = router;