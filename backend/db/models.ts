import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'
import { Position } from '../types';


dotenv.config()
const DB_URL = process.env.DB_URL

const sequelize = new Sequelize(DB_URL ?? "postgres://user:password@localhost:5432/db");

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

const Employee = sequelize.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.ENUM(Position.founder, Position.admin, Position.staff),
        allowNull: false
    }
})
Employee.belongsTo(User)
User.hasMany(Employee)

const Company = sequelize.define('Company', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
Employee.belongsTo(Company)
Company.hasMany(Employee)

export {Company, User, Employee, sequelize}