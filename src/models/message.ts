import sedb from '../utils/db';
import seq from 'sequelize';

export default sedb.define('message', {
  id: {
    type: seq.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },

  text: {
    type: seq.TEXT,
    allowNull: false,
  },

  file: {
    type: seq.JSON,
    allowNull: true,
  },

  to: {
    type: seq.INTEGER,
    allowNull: false,
  }
})