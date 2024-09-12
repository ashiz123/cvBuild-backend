const connection = require('../configs/db');



export const createMigration = (table_name) => {
    connection.query(table_name, (err, results) => {
        if (err) {
          console.error('Error created posts table:', err.stack);
        } else {
          console.log('Qualifications table created successfully.');
        }
      });
}