export const filterSurveys = (surveyItems, topic) => {
    return surveyItems.reduce(item => {
        return (item.topic === topic)
    })
}