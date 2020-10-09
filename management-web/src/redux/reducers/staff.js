/* eslint-disable no-underscore-dangle */
import { ACTION } from 'src/constants'

const initState = {
    staffs: [],
    staffInfo: {},
}

export default (state = initState, { type, payload }) => {
    switch (type) {
        case ACTION.STAFF.SET_STAFFS:
            return {
                ...state,
                staffs: payload,
            }
        case ACTION.STAFF.SET_STAFF_INFO:
            return {
                ...state,
                staffInfo: payload,
            }
        default:
            return state
    }
}
