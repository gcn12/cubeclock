// import React from 'react';
// import {Line} from 'react-chartjs-2';

// const state = {
//   labels: ['Tuesday', 'Wednesday', 'Thursday',
//            'Friday', 'Saturday'],
//   datasets: [
//     {
//       label: 'Solves',
//       fill: false,
//       lineTension: 0.5,
//       backgroundColor: 'rgba(75,192,192,1)',
//       borderColor: 'rgba(0,0,0,1)',
//       borderWidth: 2,
//       data: [14.11, 10.73, 15.24, 10.03, 13.29]
//     }
//   ]
// }

// class Graph extends React.Component {
//   render() {
//     return (
//       <div>
//         <Line
//           data={state}
//           width={100}
//           height={50}
//           options={{
//             title:{
//               display:true,
//               text:'Session Average Over Time',
//               fontSize:20
//             },
//             legend:{
//               display:false,
//               position:'right'
//             }
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default Graph

import React, { Component } from 'react'
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";

function minutesToHours(secondsTotal) {
    var hours = Math.floor(secondsTotal / 3600)
    var minutes = Math.floor((secondsTotal / 60)%60);
    var seconds = secondsTotal % 60;
    var milliseconds = "00"
    let zero = "0"
    if (hours > 0) {
        if(seconds< 10){
            return (hours + ":" + minutes + ":" + zero + seconds + "." + milliseconds)
        }else{
            return (hours + ":" + minutes + ":" + seconds + "." + milliseconds)
        }
    }else if (minutes > 0) {
        if(seconds< 10){
            return (minutes + ":" + zero + seconds + "." + milliseconds)
        }else{
            return (minutes + ":" + seconds + "." + milliseconds)
        }
    }else{
        return (seconds + "." + milliseconds)
    }
}
// function formatTime(secs)
// {
//     let hours = Math.floor(secs / (60 * 60));
   
//     let divisor_for_minutes = secs % (60 * 60);
//     let minutes = Math.floor(divisor_for_minutes / 60);
 
//     let divisor_for_seconds = divisor_for_minutes % 60;
//     let seconds = Math.ceil(divisor_for_seconds);

//     let divisor_for_milliseconds = divisor_for_seconds / 1000;
//     let milliseconds = Math.round(divisor_for_milliseconds);
    
//     if (hours > 0){
//         return hours + ":" + minutes + ":" + seconds + "."  + milliseconds;
//     }else if (minutes > 0){
//         return minutes + ":" + seconds + "."  + milliseconds;
//     }else{
//         return minutes + ":" + seconds + "."  + milliseconds;
//     }

    
// }


export default class Graph extends Component {
    chartRef = React.createRef();
    
    update = (chart) => {
        chart.update()
    }

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "line",
            data: 
            {
                labels: this.props.dates,
                // labels: ["2020-06-12T21:35:34.466Z", "2020-06-15T21:35:34.466Z", "2020-07-10T07:00:00.000Z"],
                // labels: ["Fri, 12 Jun 2020 18:47:15 +0000", "Fri, 19 Jun 2020 18:47:15 +0000", "2020-06-21T18:56:07.457Z", "2020-06-29T07:00:00.000Z"],

                datasets: [{
                    label: "Averages by Date",
                    // data: [(Math.random() > 0.5 ? 1.0 : 0) * Math.round(Math.random() * 100)],
                    data: this.props.averages,
                    // data: [5.55, 8.41, 9.99],
                    backgroundColor: this.props.isBackgroundLight ? "rgba(0,0,190,.1)" : "rgba(250,250,250,.8)" ,
                    borderColor: "light red"

                }]
              },
            
            options: {
                events: [],
                title: {
                    display: true,
                    text: "Averages Over Time",
                    fontColor: this.props.isBackgroundLight ? "rgba(10,10,10,.8)" : "rgba(250,250,250,1)",
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                'millisecond': 'MMM DD',
                                'second': 'MMM DD',
                                'minute': 'MMM DD',
                                'hour': 'MMM DD',
                                'day': 'MMM DD',
                                'week': 'MMM DD',
                                'month': 'MMM DD',
                                'quarter': 'MMM DD',
                                'year': 'MMM DD',
                            }
                        },
                        distribution: 'linear',
                        gridLines: {
                            color: this.props.isBackgroundLight ? "rgba(10,10,10,.1)" : "rgba(250,250,250,.4)"
                        },
                        ticks: {
                            fontColor: this.props.isBackgroundLight ? "rgba(10,10,10,.8)" : "rgba(250,250,250,1)",
                        }
                    }],
                    yAxes : [{
                        ticks : {
                            stepSize: 1,
                            beginAtZero : true,

                            userCallback: function(item) {
                                return minutesToHours(item)
                            },
                            // callback: function(label, index, labels) {
                            //     return formatTime(label);
                            //     },


                            maxTicksLimit: 20,
                            fontColor: this.props.isBackgroundLight ? "rgba(10,10,10,.8)" : "rgba(250,250,250,1)",
                        },   
                        gridLines: {
                            color: this.props.isBackgroundLight ? "rgba(10,10,10,.1)" : "rgba(250,250,250,.4)"
                        },
                    }],
                },
                legend:{
                    display: false
                }
            }
        });
    }
    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
