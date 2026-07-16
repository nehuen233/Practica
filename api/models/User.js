const sequelize = require("../config/db");
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
         validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    }
}, {
    timestamps: false,
    modelName: 'User'
})

module.exports = User