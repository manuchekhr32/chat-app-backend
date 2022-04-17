import { Sequelize } from 'sequelize';

const DATABASE = process.env.DATABASE as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PORT = process.env.DB_PORT as string;

export default new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  },
})