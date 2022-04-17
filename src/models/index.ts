import user from './user';
import message from './message';

user.hasMany(message, {
  foreignKey: 'from',
  onDelete: 'CASCADE',
})
message.belongsTo(user, {
  foreignKey: 'from',
  onDelete: 'CASCADE',
})

export const User = user;
export const Message = message;