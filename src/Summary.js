import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import React, { Component } from "react";

class Summary extends Component{
  render(){
    console.log(this.props.data)
      return(
          <Grid
          data={this.props.data}
          columns={this.props.columns}
          style={{
            th: {
                "background-color": this.props.isBackgroundLight ? "d4d4d4" : "#1f1d1d",
                color: this.props.isBackgroundLight ? "1f1d1d" : "white"
            },
            td: {
                "background-color": this.props.isBackgroundLight ? "white" :  "#262525",
                color: this.props.isBackgroundLight ? "3b3939" : "white"
            }
          }}
          />
      )
  }
}


export default Summary