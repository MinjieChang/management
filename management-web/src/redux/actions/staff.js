import { ENDPOINT, ACTION } from 'src/constants'
import { message } from 'antd'
import { sleep } from 'src/util'

export const namespace = 'GET_STAFFS'

export function getStaffs2() {
    return async (dispatch, getState, { fetch, history, ajax }) => {
        // const r = await fetch(ENDPOINT.STAFF.GET_STAFF)
        const response = await ajax.get(ENDPOINT.STAFF.GET_STAFFS)
        const { data } = response
        dispatch({
            type: ACTION.STAFF.SET_STAFFS,
            payload: data.staffs,
        })
    }
}

export function getStaffs() {
    return {
        namespace,
        promise: ajax => ajax.get(ENDPOINT.STAFF.GET_STAFFS),
        onSuccess: (dispatch, getState, response) => {
            /* 请求成功后执行的函数 */
            const { data } = response
            dispatch({
                type: ACTION.STAFF.SET_STAFFS,
                payload: data.staffs,
            })
            return { done: true }
        },
    }
}

export function addStaff(payload) {
    return async (dispatch, getState, { ajax }) => {
        const { data, errorCode } = await ajax.post(ENDPOINT.STAFF.ADD_STAFF, payload)
        if (data) {
            dispatch(getStaffs())
            message.success('添加成功')
        } else {
            message.error(errorCode)
        }
        return true
    }
}

export function deleteStaff(payload) {
    return async (dispatch, getState, { ajax }) => {
        const { data } = await ajax.delete(ENDPOINT.STAFF.DEL_STAFF, payload)
        if (data) {
            dispatch(getStaffs())
            message.success('删除成功')
        }
    }
}

export function getStaffInfo(payload) {
    return async (dispatch, getState, { ajax }) => {
        const { data } = await ajax.get(ENDPOINT.STAFF.GET_STAFF_INFO, payload)
        if (data) {
            dispatch({
                type: ACTION.STAFF.SET_STAFF_INFO,
                payload: data.staff,
            })
        }
    }
}

export function editStaff({ id, values }) {
    return async (dispatch, getState, { ajax }) => {
        const { data, errorCode } = await ajax.put(`${ENDPOINT.STAFF.EDIT_STAFF}/${id}`, values)
        if (data) {
            dispatch(getStaffs())
            message.success('修改成功')
        } else {
            message.error(errorCode)
        }
        return true
    }
}

export function batchDeleteStaffs(payload) {
    return async (dispatch, getState, { ajax }) => {
        const { data, errorCode } = await ajax.delete(ENDPOINT.STAFF.BATCH_DELETE_STAFFS, payload)
        if (data) {
            const { n } = data
            const { staffIds } = payload
            dispatch(getStaffs())
            message.success(`删除成功${n}个, 失败${staffIds.length - n}个`)
        } else {
            message.error(errorCode)
        }
        return { done: true }
    }
}
