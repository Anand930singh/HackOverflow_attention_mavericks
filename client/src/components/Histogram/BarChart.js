import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({data}) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {

    // Calculate frequency of each data point
    const frequencyMap = {};
    data.forEach(item => {
      frequencyMap[item] = (frequencyMap[item] || 0) + 1;
    });

    // Extract unique labels and sort them in ascending order
    let labels = Object.keys(frequencyMap).map(Number);
    labels.sort((a, b) => a - b);

    // Apply different styling for negative values
    const backgroundColors = labels.map(label => (label < 0 ? 'rgba(255, 99, 132, 0.4)' : 'rgba(75, 192, 192, 0.4)'));

    // Map labels to their respective frequencies
    const frequencies = labels.map(label => frequencyMap[label]);

    const ctx = chartContainer.current.getContext('2d');

    // Destroy existing chart instance if it exists
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.map(label => label.toString()), // Convert labels to strings
        datasets: [{
          label: 'Frequency',
          data: frequencies,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.4', '1')),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Data Points'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            },
            scaleLabel: {
              display: true,
              labelString: 'Frequency'
            }
          }]
        }
      }
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h2>Histogram</h2>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default BarChart;
