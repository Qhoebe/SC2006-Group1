/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import {handleFetchDataForGraph} from '../apiCalls/insightApi'
import '../styles/spendingGraph.css';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class SpendingGraph extends Component {	

	state = {
        data: [] // Initial state for your data
    };

	componentDidMount() {
		const fetchData = async () => {
		  try {
			const result = await handleFetchDataForGraph(this.props.username);
			this.setState({ data: result }); // Assuming 'result' is the data you want to set
		  } catch (e) {
			console.log("An error occurred while fetching data for the graph:", e);
		  }
		};
	  
		fetchData();
	}
	
	render() {
		const options = {
				animationEnabled: true,	
				title:{
					text: "Expenses For The Past Year",
                    fontColor: "#FFFFFF",
                    fontFamily: "Arial", // Optional: You can also set the font family
                    fontSize: 20, // Optional: You can also set the font size
                    
				},
                backgroundColor: "#1d1f21",
				axisY : {
					title: "Spent",
                    titleFontColor: "#FFFFFF",
                    titleFontSize: 30, 
                    titleFamily: "Arial",
                    lineColor: "#FFFFFF", // Set Y axis line color to white
                    labelFontColor: "#FFFFFF", // Set Y axis labels color to white
                    tickColor: "#FFFFFF", // Set Y axis tick marks color to white
					labelFontSize: 20,
					scaleBreaks: {
						autoCalculate: true,
						type: "wavy",
						lineColor: "white"
					}
				},
                axisX: {
                    lineColor: "#FFFFFF", // Set X axis line color to white
                    labelFontColor: "#FFFFFF", // Set X axis labels color to white
                    tickColor: "#FFFFFF", // Set X axis tick marks color to white
					labelFontSize: 20,
                },
				toolTip: {
					shared: true
				},
				legend: {
					fontColor: "#FFFFFF", // Set legend text color to white
					fontSize: 20, // Optional: you can also set the font size for the legend
					fontFamily: "Arial" // Optional: you can also set the font family for the legend
				  },
				data: this.state.data
		}

		
		return (
		<div className='graph'>
			<div className='graph-container'>
				<CanvasJSChart options = {options} />
			</div>
		</div>
		);
	}
}
 
export default SpendingGraph;   