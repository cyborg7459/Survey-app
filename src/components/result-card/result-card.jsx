import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import './result-card-styles.scss';

class ResultCard extends React.Component {
    
    render() {

        const dataValues = this.props.data.options.map(dataPoint => dataPoint.votes);
        const dataLabels = this.props.data.options.map(dataPoint => dataPoint.optionVal);

        const data = {
            labels: dataLabels,
            datasets: [
              {
                label: 'Number of Votes',
                data: dataValues,
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 0,
                hoverBackgroundColor : 'black',
                hoverOffset : 12,
                offset : 0,
                rotation : 0,
                animation : {
                    animateRotate : true,
                    animateScale : true
                }
              },
            ],
          }

        return (
            <div className="result-card">
                <div className="card-inner">
                    <h1 className='size18 mb-4 text-center'>{this.props.data.title}</h1>
                    <div className="chart-container">
                        <Doughnut options={{
                            animations : {
                                tension: {
                                    duration: 1000,
                                    easing: 'linear',
                                    from: 1,
                                    to: 0,
                                    loop: true
                                }
                            }
                        }} className='chart' data={data}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default ResultCard;