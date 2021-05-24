import authActionTypes from './authTypes';

export const logUserIn = () => ({
    type : authActionTypes.LOGIN
})

export const logUserOutState = () => ({
    type : authActionTypes.LOGOUT
})