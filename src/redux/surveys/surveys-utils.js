export const filterSurveys = (surveyItems, topic) => {
    return surveyItems.filter(item => {
        return (item.topic === topic)
    })
}

export const sortSurveys = (surveyItems, params) => {
    return surveyItems.sort((item1, item2) => {
        if(params.name === "title") {
            if(params.inc === true) 
                return item1.title < item2.title
            else 
                return item1.title > item2.title
        }
        else {
            if(params.inc === true)
                return item1.responses < item2.responses
            else
                return item1.responses > item2.responses
        }
    })
}