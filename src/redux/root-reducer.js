import {combineReducers} from 'redux';

import userReducer from './users/user-reducer';

const rootReducer = combineReducers({
    users : userReducer
})

export default rootReducer;