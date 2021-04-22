import UserActionTypes from './user-types';

export const setUser = user => ({
    type: UserActionTypes.SET_USER,
    payload: user
});

export const logUserOut = () => ({
    type: UserActionTypes.LOG_OUT
})

export const addFilledSurvey = id => ({
    type : UserActionTypes.ADD_FILLED_SURVEY,
    payload : id
})

export const addOwnedSurvey = id => ({
    type : UserActionTypes.ADD_OWNED_SURVEY,
    payload : id
})