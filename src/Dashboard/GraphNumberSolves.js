import React, { Component } from 'react'
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";
let newChart


export default class GraphNumberSolves extends Component {
    chartRef = React.createRef();

    state = {
        indexNumber: 0
    }
    
    // options = () =>{
    //     let optionsArray = this.props.categories
    //     optionsArray = ["All solves", ...optionsArray]
    //     const selectbox = document.getElementById("categoriesNumberSolves")
    //     optionsArray.map((option,index)=>{
    //         let newOption = document.createElement("option")
    //         newOption.text = option
    //         newOption.value = index
    //         selectbox.add(newOption)
    //         return(null)
    //     })
    // }

    // getIndexNumber = () =>{
    //     const x = document.getElementById("categoriesNumberSolves")
    //     const y = x.options[x.selectedIndex].value
    //     this.setState({
    //         indexNumber: y
    //     })
    // }

    componentDidMount() {
        // console.log(this.props.numberSolves)
        // console.log(this.props.dates)
        this.solvesChart()
        // this.options()
    }

    componentDidUpdate() {
        this.solvesChart()
    }

    solvesChart = () =>{
        const myChartRef = this.chartRef.current.getContext("2d");
        if (typeof newChart !== "undefined") newChart.destroy();
        newChart = new Chart(myChartRef, {
            type: "line",
            data: 
            {
                labels: this.props.dates[this.props.timePeriod][this.props.indexNumberGraphs],
                // labels: ["2020-06-12T21:35:34.466Z", "2020-06-15T21:35:34.466Z", "2020-07-10T07:00:00.000Z"],
                // labels: ["Fri, 12 Jun 2020 18:47:15 +0000", "Fri, 19 Jun 2020 18:47:15 +0000", "2020-06-21T18:56:07.457Z", "2020-06-29T07:00:00.000Z"],
    
                datasets: [{
                  label: "Averages Over Time",
                //   data: [10.22, 12.32, 6.94],
                data: this.props.numberSolves[this.props.timePeriod][this.props.indexNumberGraphs],
                backgroundColor: this.props.isBackgroundLight ? "rgba(0,0,190,.1)" : "rgba(250,250,250,.8)" ,
                borderColor: "light red",
                // borderWidth: 10,
                pointRadius: 5,
                }]
              },
            
            options: {
                events: [],
                title: {
                    display: true,
                    text: "Number of Solves by Date",
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
                            beginAtZero : true,
                            maxTicksLimit: 20,
                            fontColor: this.props.isBackgroundLight ? "rgba(10,10,10,.8)" : "rgba(250,250,250,1)",
                            stepSize: 1,
                        },   
                        gridLines: {
                            color: this.props.isBackgroundLight ? "rgba(10,10,10,.1)" : "rgba(250,250,250,.4)"
                        },
                    }],
                },
                legend:{
                    display: false
                }
            },
    
        });
    }


    render() {
        return (
            <div >
                {/* <div className="center">
                    <select onChange={this.getIndexNumber} id="categoriesNumberSolves"></select>
                </div> */}
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}