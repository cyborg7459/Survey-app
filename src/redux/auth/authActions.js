import authActionTypes from './authTypes';

export const LogUserIn = () => ({
    type : authActionTypes.LOGIN
})

export const LofUserOut = () => ({
    type : authActionTypes.LOGOUT
})