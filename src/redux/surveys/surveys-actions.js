import SurveyActionTypes from './surveys-types';

export const setSurveys = surveys => ({
    type : SurveyActionTypes.SET_SURVEYS,
    payload : surveys
})