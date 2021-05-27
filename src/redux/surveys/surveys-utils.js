export const filterSurveys = (surveyItems, topic) => {
    return surveyItems.filter(item => {
        return (item.topic === topic)
    })
}

export const sortSurveys = (surveyItems, params) => {
    return surveyItems.sort((a, b) => {
        if(params.key === "title") {
            if(params.inc)
                return (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0
            else 
                return (a.title > b.title) ? -1 : (a.title < b.title) ? 1 : 0 
        }
        else {
            if(params.inc)
                return (a.responses > b.responses) ? 1 : (a.responses < b.responses) ? -1 : 0
            else 
                return (a.responses > b.responses) ? -1 : (a.responses < b.responses) ? 1 : 0 
        }
    })
}

export const filterOnAttempt = (surveyItems, params) => {
    let filteredSurveys = [];
    const currentUser = params.user;
    const bool = params.attempted;
    surveyItems.forEach(survey => {
        const id = survey.id;
        const a = currentUser.surveysFilled.find(id);
        const b = currentUser.surveysOwned.find(id);
        if((bool && (a || b)) || (!bool && !a && !b))
            filteredSurveys.push(survey);
    })
    return filteredSurveys;
}