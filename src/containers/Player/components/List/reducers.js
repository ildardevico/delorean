import combineEvents from 'utils/combineEvents';
import { LOAD_VIDEO_LIST } from './constants';

export const list = combineEvents({
  [LOAD_VIDEO_LIST]: (state, { data }) => data,
}, []);
