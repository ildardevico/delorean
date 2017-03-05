const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const qs = require('querystring');

let config = null;

function create_sign(data, secret_key) {
  return crypto.createHmac('sha1', secret_key).update(data).digest().toString('base64');
}

function recogize(host, access_key, secret_key, query_data, query_type) {
  const http_method = 'POST';
  const http_uri = '/v1/identify';
  const data_type = query_type;
  const signature_version = '1';
  const current_data = new Date();
  const minutes = current_data.getTimezoneOffset();
  const timestamp = parseInt(current_data.getTime()/1000) + minutes*60 + '';
  const sample_bytes = query_data.length + '';

  const options = {
    hostname: host,
    port: 80,
    path: http_uri,
    method: http_method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };

  const string_to_sign = http_method+'\n'+http_uri+'\n'+access_key+'\n'+data_type+'\n'+signature_version+'\n'+timestamp;
  const sign = create_sign(string_to_sign, secret_key);
  const post_data = {
    'access_key':access_key,
    'sample_bytes':sample_bytes,
    'sample':query_data.toString('base64'),
    'timestamp':timestamp,
    'signature':sign,
    'data_type':data_type,
    'signature_version':signature_version
  };

  const content = qs.stringify(post_data);
  return new Promise((ok, rej) => {
    const req = http.request(options, res => {
      res.setEncoding('utf8');
      let acc = '';
      res.on('data', chunk => {
        acc += chunk;
      });
      res.on('end', () => {
        // console.log('No more data in response.');
        const data = JSON.parse(acc);
        if (!data.metadata) {
          ok([]);
          return;
        }
        const trackData = data.metadata.music.map(trackRaw => ({
          album: trackRaw.album.name,
          title: trackRaw.title,
          artists: trackRaw.artists.map(({ name }) => name)
        }));
        ok(trackData);
      });
    });

    req.on('error', e => {
      // console.log('problem with request: ' + e.message);
      rej(e.message);
    });

    req.write(content);
    req.end();
  });
}

const setConfig = ({ host, key, secret }) => {
  config = {
    host,
    your_access_key: key,
    your_access_secret: secret
  };
};

const recogizer = fileName => {
  if (!config) throw new Error('Can not find config');
  const { host, your_access_key, your_access_secret } = config;

  const data_type = 'audio';
  const bitmap = fs.readFileSync(fileName);
  return recogize(host, your_access_key, your_access_secret, new Buffer(bitmap), data_type);
};

module.exports = {
  setConfig,
  recogizer
};
