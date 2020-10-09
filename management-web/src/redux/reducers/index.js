import { combineReducers } from 'redux'
import loading from './loading'
import staff from './staff'
import community from './community'
import auth from './auth'

export default combineReducers({
    staff,
    loading,
    community,
    auth,
})
