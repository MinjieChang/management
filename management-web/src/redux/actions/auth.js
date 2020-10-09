import { message } from 'antd'
import { ENDPOINT, ACTION } from 'src/constants'
import history from 'src/util/history'
import { sleep } from 'src/util/index'
import cookieService from 'src/util/cookie'

export const namespace = 'register'

export function register(payload) {
    return {
        namespace,
        promise: ajax => ajax.post(ENDPOINT.AUTH.REGISTER, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                message.success('注册成功')
                sleep(1000).then(() => history.push('/auth'))
            }
        },
    }
}

export function login(payload) {
    return {
        promise: ajax => ajax.post(ENDPOINT.AUTH.LOGIN, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                message.success('登陆成功')
                dispatch({
                    type: ACTION.AUTH.SET_ACCOUNT,
                    payload: data,
                })
                cookieService.set(data._id)
                sleep(1000).then(() => history.push('/'))
            }
        },
    }
}

export function getAccountInfo(id) {
    return {
        promise: ajax => ajax.get(ENDPOINT.AUTH.GET_ACCOUNT_INFO, { id }),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                dispatch({
                    type: ACTION.AUTH.SET_ACCOUNT,
                    payload: data,
                })
                cookieService.set(data._id)
            }
        },
    }
}

export function logOut() {
    return {
        promise: ajax => ajax.post(ENDPOINT.AUTH.LOGOUT),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                message.success('已退出！')
                cookieService.clear()
                sleep(1000).then(() => history.push('/auth'))
            }
        },
    }
}
