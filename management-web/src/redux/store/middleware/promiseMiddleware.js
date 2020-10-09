// import axios from 'axios'
import ajax from 'src/util/createFetch/ajax'

export default store => next => action => {
    const { dispatch, getState } = store
    /* 如果dispatch来的是一个function，此处不做处理，直接进入下一级 */
    // 类似redux-thunk的做法
    if (typeof action === 'function') {
        // 交给redux-thunk做
        return next(action)
    }
    /* 解析action */
    const { promise, namespace, onSuccess, onError } = action

    /* 没有promise，证明不是想要发送ajax请求的，就直接进入下一步！ */
    if (!action.promise) {
        return next(action)
    }

    /* 解析types */
    const [REQUEST, SUCCESS, FAILURE] = [`${namespace}_REQUEST`, `${namespace}_SUCCESS`, `${namespace}_FAILURE`]

    /* 开始请求的时候，发一个action */
    next({
        type: REQUEST,
    })
    /* 定义请求成功时的方法 */
    const onFulfilled = result => {
        next({
            type: SUCCESS,
        })
        if (onSuccess) {
            return onSuccess(dispatch, getState, result)
        }
        return ''
    }
    /* 定义请求失败时的方法 */
    const onRejected = error => {
        next({
            type: FAILURE,
        })
        if (onError) {
            return onError(error)
        }
        return ''
    }

    return promise(ajax)
        .then(onFulfilled, onRejected)
        .catch(error => {
            console.error('MIDDLEWARE ERROR:', error)
            onRejected(error)
        })
}
