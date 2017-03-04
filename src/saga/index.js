import { fork } from 'redux-saga/effects'
import userSaga from './userSaga'


export default function * rootSaga() {
  return yield * [
    fork(userSaga),
  ]
}
