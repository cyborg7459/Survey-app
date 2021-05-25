import SurveyActionTypes from './surveys-types';

export const setSurveys = surveys => ({
    type : SurveyActionTypes.SET_SURVEYS,
    payload : surveys
})

export const filterSurveysByTopic = topic => ({
    type : SurveyActionTypes.FILTER_SURVEYS,
    payload : topic
})