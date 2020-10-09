/* eslint-disable no-underscore-dangle */
import { ACTION } from 'src/constants'

const initState = {
    account: {},
}

export default (state = initState, { type, payload }) => {
    switch (type) {
        case ACTION.AUTH.SET_ACCOUNT:
            return {
                ...state,
                account: payload,
            }
        default:
            return state
    }
}
