require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const morgan = require('morgan');









                                          
app.use(cors());


app.use(morgan('combined'));

// // Middleware to parse JSON bodies
app.use(express.json());


// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));







// Import user routes files
const authRoutes = require('./routes/authentication');
const migrateRoutes = require('./routes/migration');
const cvRoutes = require('./routes/cv');
const pageRoutes = require('./routes/pages');

// Use user routes
app.use('/auth', authRoutes);
app.use('/migrate', migrateRoutes)
app.use('/cv', cvRoutes);
app.use('', pageRoutes);

//To handle the error
app.use(errorHandler);


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
