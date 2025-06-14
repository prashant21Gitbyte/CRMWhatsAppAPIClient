import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
 
const DonutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
 
  useEffect(() => {
    const getColor = (colorName, opacity) => {
      const colors = {
        pending: `rgba(255, 193, 7, ${opacity})`,
        warning: `rgba(255, 87, 34, ${opacity})`,
        primary: `rgba(22, 23, 90, ${opacity})`,
        white: 'rgba(255, 255, 255, 1)',
      };
      return colors[colorName] || `rgba(0,0,0,${opacity})`;
    };
 
    const dataValues = [15, 10, 65];
    const backgroundColors = [
      getColor('warning', 0.9),
      getColor('pending', 0.9),
      getColor('primary', 0.9),
    ];
 
    const ctx = chartRef.current.getContext('2d');
 
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
 
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Sent Messages', 'Read Messages', 'Delivered Messages'],
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColors,
            borderWidth: 5,
            borderColor: getColor('white', 1),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'rgba(100, 116, 139, 0.8)',
              padding: 15,
            },
          },
        },
      },
    });
 
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
 
  return (
    <div
      className="position-relative"
      // style={{ height: '350px', minHeight: '300px' }}
    >
      <canvas ref={chartRef} className="" />
    </div>
  );
};
 
export default DonutChart;