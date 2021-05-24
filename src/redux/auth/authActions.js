import authActionTypes from './authTypes';

export const logUserIn = () => ({
    type : authActionTypes.LOGIN
})

export const logUserOut = () => ({
    type : authActionTypes.LOGOUT
})