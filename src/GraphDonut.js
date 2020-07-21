import React, { Component } from "react"
import Chart from "chart.js";
let newChart;

class Donut extends Component {
    chartRef = React.createRef();



    componentDidMount() {
        // console.log(this.props.puzzles)
        // console.log(this.props.numberSolvesCategory)
        this.buildChart()
    }

    componentDidUpdate() {
        this.buildChart()
    }


    buildChart = () => {
        // this.disableAnimation()
        const myChartRef = this.chartRef.current.getContext("2d");
        if (typeof newChart !== "undefined") newChart.destroy();
        newChart = new Chart(myChartRef, {
            type: "doughnut",
            data: 
            {
                labels: this.props.puzzles[this.props.timePeriod],
                // labels: ["2020-06-12T21:35:34.466Z", "2020-06-15T21:35:34.466Z", "2020-07-10T07:00:00.000Z"],
                // labels: ["Fri, 12 Jun 2020 18:47:15 +0000", "Fri, 19 Jun 2020 18:47:15 +0000", "2020-06-21T18:56:07.457Z", "2020-06-29T07:00:00.000Z"],
    
                datasets: [{
                    label: "Puzzle Type",
                    // data: [(Math.random() > 0.5 ? 1.0 : 0) * Math.round(Math.random() * 100)],
                    data: this.props.numberSolvesCategory[this.props.timePeriod],
                    // data: [5.55, 8.41, 9.99],
                    // backgroundColor: this.props.isBackgroundLight ? "rgba(0,0,190,.1)" : "rgba(250,250,250,.8)" ,
                    backgroundColor: this.props.isBackgroundLight ? ["#B09E99", '#FEE9E1', "#FAD4C0", "#64B6AC", "C0FDFB", "#966B9D", "#C98686", "#F2B880", "#FFF4EC", "#E7CFBC", "#B0D0D3", "#C08497", "#F7AF9D", "#F7E3AF", "#F3EEC3", "#FAD4C0"] : ["#F9C80E", "#F86624", "#EA3546", "#662E9B", "#43BCCD", "#1B998B", "#2D3047", "#FFFD82", "#FF9B71", "#E84855", "#50514F", "#F25F5C", "#FFE066", "#247BA0", "#70C1B3", "#43BCCD"],
                    // ["#E7E6F7", "E3D0D8", "AEA3B0", "827081", "C6D2ED"]
                    // ["#031A6B", "#033860", "#087CA7", "#004385", "#05B2DC"]
                    borderColor: "light red"
    
                }]
              },
            
            options: {
                animation: 0,
                title: {
                    display: true,
                    text: "Puzzle Type",
                    fontColor: this.props.isBackgroundLight ? "rgba(10,10,10,.8)" : "rgba(250,250,250,1)",
                },
                responsive: true,
                legend:{
                    display: false
                }
            }
        });
    }

    render() {
        return(
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default Donut