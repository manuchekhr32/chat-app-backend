import sedb from '../utils/db';
import seq from 'sequelize';

export default sedb.define('user', {
  id: {
    type: seq.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: seq.STRING(20),
    allowNull: false,
    unique: true,
  },

  firstName: seq.STRING,
  lastName: seq.STRING,

  _password: {
    type: seq.STRING,
    allowNull: false,
  }
})