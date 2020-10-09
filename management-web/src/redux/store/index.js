import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createFetch, ajax } from 'src/util/createFetch'
import reducers from '../reducers'
import promiseMiddleware from './middleware/promiseMiddleware'
import log from './middleware/log'

const clientFetch = createFetch(fetch, {
    getDispatch: () => store.dispatch,
    baseUrl: 'http://localhost:8000/',
})

const store = createStore(
    reducers,
    applyMiddleware(...[promiseMiddleware, thunkMiddleware.withExtraArgument({ fetch: clientFetch, ajax }), log]),
)

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextCombineReducers = require('../reducers').default
        store.replaceReducer(nextCombineReducers)
    })
}

export default store
