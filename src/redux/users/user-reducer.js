import UserActionTypes from './user-types';

const INITIAL_STATE = {
    currentUser : null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SET_USER: 
            return {
                ...state, 
                currentUser : action.payload
            }
        case UserActionTypes.LOG_OUT:
            return {
                ...state, 
                currentUser : null
            }
        case UserActionTypes.ADD_FILLED_SURVEY:
            return {
                ...state,
                currentUser : {
                    ...state.currentUser,
                    surveysFilled : [...state.currentUser.surveysFilled, action.payload]
                }
            }
        case UserActionTypes.ADD_OWNED_SURVEY: 
            return {
                ...state,
                currentUser : {
                    ...state.currentUser,
                    surveysOwned : [...state.currentUser.surveysOwned, action.payload]
                }
            }
        default:
            return state
    }
}

export default userReducer;