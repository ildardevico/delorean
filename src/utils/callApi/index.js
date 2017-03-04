// @flow
import serialize from './serialize';
import config from 'config';

type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body: string | {[key: string]: any} | any,
  headers: {[key: string]: string},
  query: string | {[key: string]: string}
}

let token;
let client = fetchClient;
let requestTool = fetch;

export function setRequestTool(tool: Function) {
  requestTool = tool;
}

export function setToken(authToken: string) {
  token = authToken;
}

export function setClient(newClient: Function) {
  client = newClient;
}

export function fetchClient(url: string, params: Object): Promise<Response> {
  return requestTool(url, params)
    .then(response => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.json();
      }
    });
}

export function callApi(url: string, params: RequestOptions | any): Promise<Response> {
  let preparedUrl = url;
  const preparedParams = { ...params };

  if (typeof preparedParams.query === 'object') {
    preparedUrl += `?${serialize(preparedParams.query)}`;
  } else if (typeof preparedParams.query === 'string') {
    preparedUrl += `?${preparedParams.query}`;
  }

  if (preparedParams.body && typeof preparedParams.body !== 'string' && !(preparedParams.body instanceof FormData)) {
    preparedParams.body = JSON.stringify(preparedParams.body);
  }

  preparedParams.headers = {
    'Content-Type': 'application/json',
    ...(preparedParams.headers || {}),
  };

  if (token) {
    preparedParams.headers.Authorization = `Bearer ${token}`;
  }

  const { method, headers, body } = preparedParams;
  const { API_HOST } = config;
  return client(
    `${API_HOST}/${preparedUrl}/`,
    {
      method: method || 'GET',
      headers,
      body,
    }
  );
}
