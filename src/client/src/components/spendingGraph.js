import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { handleFetchDataForGraph } from '../apiCalls/insightApi';
import { useUpdate  } from '../context/UpdateContext';
import '../styles/spendingGraph.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SpendingGraph = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const { updateFlag } = useUpdate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await handleFetchDataForGraph(props.username);
                setData(result);
            } catch (error) {
                console.error("An error occurred while fetching data for the graph:", error);
                setError("Failed to load data.");
            }
        };

        fetchData();
    }, [props.username, updateFlag]); // Re-fetch data on username or updateFlag change

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
                {error ? <p>{error}</p> : <CanvasJSChart options={options} key={JSON.stringify(data)} />}
            </div>
        </div>
    );
}

export default SpendingGraph;
