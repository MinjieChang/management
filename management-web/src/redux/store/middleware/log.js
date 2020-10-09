const log = store => next => action => {
    const isDev = process.env.NODE_ENV !== 'production'
    if (isDev) {
        // console.log('last state:', store.getState())
        // console.log('action:', action)
    }
    next(action)
    if (isDev) {
        // console.log('new state:', store.getState())
    }
}

export default log
