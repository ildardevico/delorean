import createPromiseAction from 'utils/createPromiseAction';
import { callApi } from 'utils/callApi';
import { LOAD_VIDEO_LIST } from './constants';

export const loadList = createPromiseAction(() => callApi('list'), LOAD_VIDEO_LIST);
