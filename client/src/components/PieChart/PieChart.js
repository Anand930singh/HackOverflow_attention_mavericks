import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  // Function to calculate frequency of each category
  const calculateFrequency = (dataArray) => {
    const frequencyMap = {};
    dataArray.forEach(item => {
      if (frequencyMap[item]) {
        frequencyMap[item]++;
      } else {
        frequencyMap[item] = 1;
      }
    });
    return frequencyMap;
  };

  const frequencyMap = calculateFrequency(data);

  const labels = Object.keys(frequencyMap);
  const frequencies = Object.values(frequencyMap);

  const chartData = {
    labels: labels,
    datasets: [{
      data: frequencies,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(255, 77, 166)',
        'rgb(120, 120, 120)',
        'rgb(0, 255, 0)',
        'rgb(255, 0, 255)',
        'rgb(0, 0, 255)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
