import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'


dotenv.config()
const DB_URL = process.env.DB_URL

const sequelize = new Sequelize(DB_URL ?? "postgres://user:password@localhost:5432/db");

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
});

const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    position: DataTypes.ENUM('founder', 'admin, staff'),
})
Employee.belongsTo(User)
User.hasMany(Employee)

const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
})
Employee.belongsTo(Company)
Company.hasMany(Employee)

export {Company, User, Employee, sequelize}