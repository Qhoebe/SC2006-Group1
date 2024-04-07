// import React, { useState } from 'react';
// import {XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';
// import '../node_modules/react-vis/dist/style.css'; // Import the styles

// const SpendingGraph = () => {
//   const [duration, setDuration] = useState('1 year'); // Default to 1 year
//   const [linesToShow, setLinesToShow] = useState(['distance', 'fuel', 'total']); // Default to show all lines

//   // Dummy data
//   const data = {
//     distance: [{x: 1, y: 10}, {x: 2, y: 15}, {x: 3, y: 9}],
//     fuel: [{x: 1, y: 5}, {x: 2, y: 11}, {x: 3, y: 6}],
//     total: [{x: 1, y: 20}, {x: 2, y: 29}, {x: 3, y: 18}],
//   };

//   // Handling duration change (example function, adapt as needed)
//   const handleDurationChange = (newDuration) => {
//     setDuration(newDuration);
//     // Update data based on newDuration...
//   };

//   // Handling line visibility toggle (example function, adapt as needed)
//   const toggleLine = (line) => {
//     setLinesToShow((prevLines) => prevLines.includes(line) ? prevLines.filter(l => l !== line) : [...prevLines, line]);
//   };

//   return (
//     <div style={{ padding: '20px', borderRadius: '15px', border: '1px solid #ccc', marginBottom: '20px' }}>
//       <h2 style={{ textAlign: 'center' }}>Past Year Spending</h2>
//       <XYPlot height={300} width={600}>
//         <VerticalGridLines />
//         <HorizontalGridLines />
//         <XAxis title="Month" />
//         <YAxis title="Value" />
//         {linesToShow.includes('distance') && <LineSeries data={data.distance} color="blue" />}
//         {linesToShow.includes('fuel') && <LineSeries data={data.fuel} color="red" />}
//         {linesToShow.includes('total') && <LineSeries data={data.total} color="green" />}
//       </XYPlot>
//       {/* Duration and line toggle controls */}
//       {/* Implement UI elements to change duration and toggle lines */}
//     </div>
//   );
// };

// export default SpendingGraph;
