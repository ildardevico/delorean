import { SHAZAM } from './constants';
import createPromiseAction from 'utils/createPromiseAction';
import { callApi } from 'utils/callApi';


export const shazam = createPromiseAction(
  body => callApi('shazam', { method: 'POST', body}),
  SHAZAM,
);
