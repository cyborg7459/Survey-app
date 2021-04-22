import React from 'react';
import ResultCard from '../../components/result-card/result-card';

class ResultPage extends React.Component {

    state = {
        data: [
            {
                question : 'Who is the best player of all times',
                options : [
                    {
                        value : "Messi",
                        votes : 189
                    },
                    {
                        value : "Ronaldo",
                        votes : 132
                    },
                    {
                        value : "Maradona",
                        votes : 109
                    },
                    {
                        value : "Pele",
                        votes : 175
                    }
                ]
            },
            {
                question : "Who is the best striker in the world",
                options : [
                    {
                        value : "Lewandowski",
                        votes : 555
                    },
                    {
                        value : "Harry Kane",
                        votes : 653
                    },
                    {
                        value : "Aubameyang",
                        votes : 122
                    }
                ]
            }
        ]
    }

    render() {
        return (
            <div className="page-container">
                <div className="page-inner">
                    <h1>This is the results page</h1>
                    {
                        this.state.data.map((dataPoint,idx) => {
                            console.log("HEllo");
                            return (
                                <ResultCard key={idx} data={dataPoint}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ResultPage;