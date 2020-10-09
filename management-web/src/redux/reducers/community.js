/* eslint-disable no-underscore-dangle */
import { ACTION } from 'src/constants'

const initState = {
    talks: [],
    comments: {},
}

export default (state = initState, { type, payload }) => {
    switch (type) {
        case ACTION.COMMUNITY.SET_TALKS:
            return {
                ...state,
                talks: payload,
            }
        case ACTION.COMMUNITY.SET_COMMENTS:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [payload.talkId]: payload.comments,
                },
            }
        default:
            return state
    }
}
