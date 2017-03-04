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

      forgotPassword(email, cb) {
        User.findOne({
          where: { email }
        })
        .then(user => {
          if (!user) {
            cb(new Error('Wrong email'));
            return false;
          }

          user.save()
          .then(user => cb(null, user));
        })
        .catch(err => {
          cb(new Error('We have troubles with serve'));
        });
      },

      updatePassword(password, resetToken, cb) {
        User.findOne({ where: { resetToken } })
        .then(user => {
          if (!user) {
            cb(new Error('Error while update password'))
            return
          }

          user.setPassword(password, (err, user) => {
            if (err) {
              cb(err)
              return
            }
            user.resetTokenExpires = null
            user.resetToken = null
            user.save()
            .then(() => cb(null))
            .catch(err => cb(err))
          })
        })
        .catch(err => {
          cb(new Error('We have troubles with server'))
        })
      }
    },
    instanceMethods: {
      // charge(amount) {
      //   const self = this
      //   const newBalance = self.get('balance') - amount
      //   const m = Math.pow(10, 2)
      //   const roundedBalance = Math.round(newBalance * m) / m
      //   console.log(`User balance before charge ${self.get('balance')}`)
      //   console.log(`Total order cost ${amount}`)
      //   console.log(`User balance after charge ${roundedBalance}`)
      //   if (roundedBalance < 0) {
      //     return Promise.reject('Not enough funds')
      //   }
      //   return self.set('balance', roundedBalance)
      // },
      // addFunds(amount) {
      //   const self = this
      //   const oldBalance = self.get('balance')
      //   console.log(`@INFO ${self.get('id')} old balance ${oldBalance}`)
      //   const newBalance = oldBalance + amount
      //   const m = Math.pow(10, 2)
      //   const roundedBalance = Math.round(newBalance * m) / m
      //   console.log(`@INFO ${self.get('id')} refill amount ${amount}`)
      //   global.telegramLog(`@INFO\nuserId:${self.get('id')}\nrefill amount ${amount}\nnew balance ${roundedBalance}`)
      //   console.log(`@INFO ${self.get('id')} new balance ${roundedBalance}`)
      //   return self.set('balance', roundedBalance)
      // },
      // authenticate(password, cb) {
      //   const self = this
      //   // prevent to throw error from crypto.pbkdf2
      //   if (!this.get('salt')) {
      //     cb(null, false, { message: 'No salt value stored' })
      //     return
      //   }
      //   crypto.pbkdf2(password, this.get('salt'), 12000, 128, (err, hashRaw) => {
      //     if (err) {
      //       cb(err)
      //       return
      //     }
      //     const hash = new Buffer(hashRaw, 'binary').toString('hex')
      //     if (hash === self.get('hash') && self.get('emailVerified') === true) {
      //       cb(null, self)
      //     } else {
      //       cb(null, false, { message: 'Incorrect password or email dont verified'})
      //     }
      //   })
      // },
      //
      // setPassword(password, cb) {
      //   if (!password) {
      //     cb(new Error('Password argument not set!'))
      //     return
      //   }
      //   const self = this
      //   crypto.randomBytes(32, (err, buf) => {
      //     if (err) {
      //       cb(err)
      //       return
      //     }
      //     const salt = buf.toString('hex')
      //     crypto.pbkdf2(password, salt, 12000, 128, (err, hashRaw) => {
      //       if (err) {
      //         cb(err)
      //         return
      //       }
      //       self.set('hash', new Buffer(hashRaw, 'binary').toString('hex'))
      //       self.set('salt', salt)
      //
      //       cb(null, self)
      //     })
      //   })
      // },
      //
      // setActivationKey() {
      //   const self = this
      //   const token = uuid.v4()
      //   self.set('signupToken', token)
      // },
      //
      // setResetKey() {
      //   const self = this
      //   const token = uuid.v4()
      //   self.set('resetToken', token)
      //   self.set('resetTokenExpires', new Date().valueOf() + (configLock.tokenExpiration * 1000 * 3600))
      // }
    }
  })

  return User;
};
