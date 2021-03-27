import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './users/user-reducer';

const persistConfig = {
    key : 'root',
    storage, 
    whitelist: ['users']
}

const rootReducer = combineReducers({
    users : userReducer
})

export default persistReducer(persistConfig, rootReducer);