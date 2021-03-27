import UserActionTypes from './user-types';

export const setUser = user => ({
    type: UserActionTypes.SET_USER,
    payload: user
});

export const logUserOut = () => ({
    type: UserActionTypes.LOG_OUT
})