import config from 'config';

const { API_HOST } = config;

export default config => fetch(`http://${API_HOST}/download`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(config)
})
.then(res => res.json())
.then(({ path }) => path.slice(9))
.then(path => `http://${API_HOST}/${path}`);
