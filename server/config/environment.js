import config from './config.json'

const envConfig = {
  ...config[process.env.NODE_ENV || 'development'],
  domain: process.env.NODE_ENV === 'production' ? 'http://social-booster.org' : 'http://localhost:7051',
  socketPort: 3000,
}

module.exports = envConfig
