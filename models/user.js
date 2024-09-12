const { DataTypes } = require('sequelize');
const sequelize = require('../index'); // Replace with the correct path to your sequelize initialization
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.beforeCreate(async (User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
})

module.exports = User;