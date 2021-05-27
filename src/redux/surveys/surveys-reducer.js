import SurveyActionTypes from './surveys-types';
import {filterSurveys, sortSurveys, filterAttempted} from './surveys-utils';

const INITIAL_STATE = {
    surveys : [],
    surveysToDisplay: []
}

const surveysReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case SurveyActionTypes.SET_SURVEYS : 
            return {
                ...state,
                surveys : action.payload,
                surveysToDisplay : action.payload
            }

        case SurveyActionTypes.FILTER_SURVEYS : 
            return {
                ...state,
                surveysToDisplay : filterSurveys(state.surveys, action.payload)
            }

        case SurveyActionTypes.RESET_FILTERS :
            return {
                ...state,
                surveysToDisplay : state.surveys
            }

        case SurveyActionTypes.SORT_SURVEYS :
            return {
                ...state,
                surveysToDisplay : sortSurveys(state.surveysToDisplay, action.payload)
            }

        case SurveyActionTypes.FILTER_ON_ATTEMPTED : 
            return {
                ...state, 
                surveysToDisplay : filterAttempted(state.surveys, action.payload)
            }

        default:
            return state
    }
}

export default surveysReducer;