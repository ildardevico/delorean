import config from './config.json';

module.exports =  {
  ...config[process.env.NODE_ENV || 'development'],
  secret: 'delorian-secret'
};
