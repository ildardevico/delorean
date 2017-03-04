import { takeEvery, fork, put, select } from 'redux-saga/effects'
import counterpart from 'counterpart'
import _ from 'lodash'
import {
  // USER_LOGIN,
  // USER_LOGIN_FAIL,
  // USER_LOGOUT,
  // USER_REGISTER,
  // USER_REGISTER_FAIL,
  ADD_TO_COUNTER,
  methods,
} from '../constants'
import { callApi } from '../common/helpers/callApi'
import { push } from 'react-router-redux'
// import {
//   saveUser,
// } from '../actions/user'
import Notifications from 'react-notification-system-redux'

const timeStub = time => new Promise(ok => setTimeout(ok, time)) // pause saga for time in ms


function * userLogin() {
  // yield initLoading()
}

function * userLogout() {
  // yield put(push('/'))
}

function * userRegisterSuccess() {
  // yield put(push('/register-success'))
}

function * userRegisterFail({ res: { message } }) {
  yield put(Notifications.error({
    title: 'Register error',
    message,
  }))
}

function * initLoading() {
  // yield put(getServices())
  // yield put(push('/order/new'))
  // yield put(getOrders())
  // yield put(getTransactions())
}

function * userLoginFail({ res: { message }}) {
  // message = message || 'Wrong email or password'
  // yield put(Notifications.error({
  //   title: 'Login error',
  //   message,
  // }))
}

function * addToCounter() {
  yield put(Notifications.success({
    title: 'Counter action saga',
    message: 'Counter added',
  }))
}

export default function * userSaga() {
  // const { res: { user } } = yield callApi('auth/login', { method: methods.get })
  // const currentPath = yield select(({ routing }) => _.get(routing, 'locationBeforeTransitions.pathname'))
  //
  // if (user) {
  //   yield put(saveUser(user))
  //   yield fork(initLoading)
  // } else {
  //   if (!(~currentPath.indexOf('/forgot/') || ~currentPath.indexOf('/signup/'))) {
  //     yield put(push('/'))
  //   }
  // }

  yield * [
    // takeEvery(USER_LOGIN, userLogin),
    // takeEvery(USER_LOGOUT, userLogout),
    // takeEvery(USER_LOGIN_FAIL, userLoginFail),
    // takeEvery(USER_REGISTER_FAIL, userRegisterFail),
    // takeEvery(USER_REGISTER, userRegisterSuccess),
    takeEvery(ADD_TO_COUNTER, addToCounter),
  ]
}
