import React, { Component } from 'react'
import Chart from "chart.js";
let newChart;

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


export default class Graph extends Component {
    chartRef = React.createRef();
    
    state={
        data: "",
        indexNumber: "",
        test: "",
    }



    compare = (a,b) => {
        // if (a > b){
            return a - b
        // }
    }

    changeData = () => {
        this.setState({
            data: [5.55, 8.41, 9.99]
        })
    }

    options = () => {
        let optionsArray = this.props.categories
        optionsArray = ["All solves", ...optionsArray]
        const selectbox = document.getElementById("categories")
        optionsArray.map((option, index)=> {
            let newOption = document.createElement("option")
            newOption.text=option
            newOption.value=index
            selectbox.add(newOption)
            return(null)
        })
    }

    optionsTimePeriod = () => {
        let optionsArray = ["All time", "Week", "Month", "Year",]
        const selectbox = document.getElementById("timePeriod")
        optionsArray.map((option, index)=> {
            let newOption = document.createElement("option")
            newOption.text=option
            newOption.value=index
            selectbox.add(newOption)
            return(null)
        })
    }

    changeIndexNumber = () =>{
        this.props.changeIndexNumber("categories")
        const x = document.getElementById("categories")
        const y = x.options[x.selectedIndex].value
        this.setState({
            indexNumber: y
        })
    }

    changeTimePeriod = () =>{
        this.props.changeTimePeriod("timePeriod")
        const x = document.getElementById("timePeriod")
        const y = x.options[x.selectedIndex].value
        this.setState({
            timePeriod: y
        })
    }

    test = () =>{
        let testArray = new Set(this.props.averages)
        this.setState({
            test: testArray
        })
        // console.log("test", this.state.test)
    }


    componentDidMount() {
        this.optionsTimePeriod()
        setTimeout(()=>this.changeIndexNumber(),10)
        // setTimeout(()=>console.log(this.props.averages),100)
        // setTimeout(()=>console.log(this.props.dates),100)
        this.options()
        this.buildChart()
    }

    componentDidUpdate() {
        this.buildChart()
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        if (typeof newChart !== "undefined") newChart.destroy();
        newChart = new Chart(myChartRef, {
            type: "line",
            data: 
            {
                labels: this.props.dates[this.props.timePeriod][this.state.indexNumber],
                // labels: ["2020-06-12T21:35:34.466Z", "2020-06-15T21:35:34.466Z", "2020-07-10T07:00:00.000Z"],
                // labels: ["Fri, 12 Jun 2020 18:47:15 +0000", "Fri, 19 Jun 2020 18:47:15 +0000", "2020-06-21T18:56:07.457Z", "2020-06-29T07:00:00.000Z"],
    
                datasets: [{
                    label: "Averages by Date",
                    // data: [(Math.random() > 0.5 ? 1.0 : 0) * Math.round(Math.random() * 100)],
                    data: this.props.averages[this.props.timePeriod][this.state.indexNumber],
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
                <div className="center">
                    {this.props.isBackgroundLight ? 
                    <select className="pa1 ba b--green bg-white" style={{color: "black"}}  onChange={this.changeIndexNumber} id="categories"></select>
                    :
                    <select className="pa1 ba b--green bg-black" style={{color: "white"}}  onChange={this.changeIndexNumber} id="categories"></select>
                    }
                    {this.props.isBackgroundLight ? 
                    <select onChange={this.changeTimePeriod} id="timePeriod" className="pa1 ba b--green bg-white" style={{color: "black"}}></select>
                    :
                    <select onChange={this.changeTimePeriod} id="timePeriod" className="pa1 ba b--green bg-black" style={{color: "white"}}></select>
                    }
                </div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
