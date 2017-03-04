import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';

const basename = path.basename(module.filename);

const db = {};
const sequelize = process.env.NODE_ENV !== 'production'
  ? new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password, {
      host: config.development.host,
      logging(message) {

      },
      define: {
        timestamps: false
      }
    }
  )
  : new Sequelize(
    config.production.database,
    config.production.username,
    config.production.password, {
      host: config.production.host,
      logging(message) {
        console.log(message);
      },
      port: config.production.port,
      define: { timestamps: false }
    }
  );

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
