import SurveyActionTypes from './surveys-types';

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
        default:
            return state
    }
}

export default surveysReducer;