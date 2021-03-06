import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import './result-card-styles.scss';

class ResultCard extends React.Component {

    buildColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 1)`
    }
    
    render() {

        const dataValues = this.props.data.options.map(dataPoint => dataPoint.votes);
        const dataLabels = this.props.data.options.map(dataPoint => dataPoint.optionVal);
        const colorArray = this.props.data.options.map(dataPoint => {
            return this.buildColor();
        })

        const data = {
            labels: dataLabels,
            datasets: [
              {
                label: 'Number of Votes',
                data: dataValues,
                backgroundColor: colorArray,
                borderWidth: 0,
                hoverBackgroundColor : 'black',
                hoverOffset : 5,
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
                    <h1 className='size17 mb-4 text-center'>{this.props.data.title}</h1>
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