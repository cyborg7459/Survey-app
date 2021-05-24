import authActionTypes from './authTypes';

const INITIAL_STATE = {
    isLoggedIn : false
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case authActionTypes.LOGIN:
            return {
                ...state, 
                isLoggedIn: true
            }
        case authActionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            }
        default: 
            return {
                ...state
            }
    }
}

export default authReducer;