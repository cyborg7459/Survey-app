import SurveyActionTypes from './surveys-types';

const INITIAL_STATE = {
    surveys : []
}

const surveysReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SurveyActionTypes.SET_SURVEYS : 
            return {
                ...state,
                surveys : action.payload
            }
    }
}

export default surveysReducer;