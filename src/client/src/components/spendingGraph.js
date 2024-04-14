import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { handleFetchDataForGraph } from '../apiCalls/insightApi';
import '../styles/spendingGraph.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SpendingGraph extends Component {
    state = {
        data: [], // Initial state for your data
        error: null // State to handle errors
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const result = await handleFetchDataForGraph(this.props.username);
            this.setState({ data: result });
        } catch (error) {
            console.error("An error occurred while fetching data for the graph:", error);
            this.setState({ error: "Failed to load data." });
        }
    }

    render() {
        const { data, error } = this.state;

        const options = {
            animationEnabled: true,
            title: {
                text: "Expenses For The Past Year",
                fontColor: "#FFFFFF",
                fontFamily: "Arial",
                fontSize: 20,
            },
            backgroundColor: "#1d1f21",
            axisY: {
				includeZero: true,
				minimum: 0, // Make sure this is set so zero values are within the visible range.
    			viewportMinimum: -0.01,
                title: "Spent",
                titleFontColor: "#FFFFFF",
                titleFontSize: 30,
                titleFamily: "Arial",
                lineColor: "#FFFFFF",
                labelFontColor: "#FFFFFF",
                tickColor: "#FFFFFF",
                labelFontSize: 20,
                scaleBreaks: {
                    autoCalculate: true,
                    type: "wavy",
                    lineColor: "white"
                }
            },
            axisX: {
                lineColor: "#FFFFFF",
                labelFontColor: "#FFFFFF",
                tickColor: "#FFFFFF",
                labelFontSize: 20,
            },
            toolTip: {
                shared: true
            },
            legend: {
                fontColor: "#FFFFFF",
                fontSize: 20,
                fontFamily: "Arial"
            },
            data
        };

        return (
            <div className='graph'>
                <div className='graph-container'>
                    {error ? <p>{error}</p> : <CanvasJSChart options={options} key={JSON.stringify(this.state.data)} />
}
                </div>
            </div>
        );
    }
}

export default SpendingGraph;
