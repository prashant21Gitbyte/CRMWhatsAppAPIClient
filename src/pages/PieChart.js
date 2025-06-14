import React from "react";
import { CanvasJSChart } from 'canvasjs-react-charts';
 
const PieChart = () => {
  const options = {
    backgroundColor: "#EFF2F7",
    title: {
      text: "Message Distribution Overview"
    },
    legend: {
      maxWidth: 140,
      itemWidth: 250
    },
    data: [{
      type: "pie",
      showInLegend: true,
      legendText: "{indexLabel}",
      indexLabelFormatter: function (e) {
        return `${e.dataPoint.indexLabel} - ${e.dataPoint.y.toLocaleString()}`;
      },
      indexLabelFontColor: "#333",
      indexLabelLineColor: "#999",
      indexLabelPlacement: "outside",
      dataPoints: [
        { y: 2175498, indexLabel: "Sent Messages", color: "#F44336" },
        { y: 3125844, indexLabel: "Delivered Messages", color: "#2196F3" },
        { y: 4181563, indexLabel: "Read Messages", color: "#4CAF50" }
      ]
    }]
  };
 
  return (
    <div style={{ width: '100%', maxWidth: '400px', height: '410px', background: '#EFF2F7' }}>
      <CanvasJSChart options={options} />
    </div>
  );
};
 
export default PieChart;
 
 