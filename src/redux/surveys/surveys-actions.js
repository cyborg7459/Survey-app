import SurveyActionTypes from './surveys-types';

export const setSurveys = surveys => ({
    type : SurveyActionTypes.SET_SURVEYS,
    payload : surveys
})

export const filterSurveysByTopic = topic => ({
    type : SurveyActionTypes.FILTER_SURVEYS,
    payload : topic
})

export const resetFilters = () => ({
    type : SurveyActionTypes.RESET_FILTERS
})

export const sortSurveys = params => ({
    type : SurveyActionTypes.SORT_SURVEYS,
    payload : params
})

export const filterAttempted = params => ({
    type : SurveyActionTypes.FILTER_ON_ATTEMPTED,
    payload : params
})