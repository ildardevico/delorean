import crypto from 'crypto';
import uuid from 'node-uuid';
import { forgotPassword as configLock } from '../config/lock';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      register(user, password, cb) {
        User.findOne({
          where: {
            email: user.dataValues.email
          }
        })
        .then(existingUser => {
          if (existingUser) {
            cb(new Error('Existing user'));
            return false;
          }

          user.setPassword(password, (err, user) => {
            if (err) {
              return cb(err);
            }

            user.save()
            .then(() => cb(null, user))
            .catch(error => cb(error));
          });
        });
      },
    }
  });
  return User;
};
