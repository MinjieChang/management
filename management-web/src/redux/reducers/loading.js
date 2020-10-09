const initState = {}

export default (state = initState, { type, payload }) => {
    // GET_STAFF_REQUEST
    const match = /(.*)\_(REQUEST|SUCCESS|ERROR)/

    const result = match.exec(type)

    if (!result) return state

    const [action_type, namespace, status] = result

    return {
        ...state,
        [namespace]: status === 'REQUEST',
    }
}
