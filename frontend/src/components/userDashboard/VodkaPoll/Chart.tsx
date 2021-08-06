import React, { useEffect, useState } from 'react';
import { Pie, defaults } from 'react-chartjs-2';
import { useApi } from '../../../hooks';

defaults.font.size = 14;
defaults.font.family = 'Inter';
defaults.color = '#6c757d';
defaults.font.weight = '400';

interface ChartData {
  labels: Array<string>;
  data: Array<number>;
}

const VodkaChart = () => {
  const [data, setData] = useState<ChartData | undefined>();
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api?.getVodkaPoll();

      if (!response) return;

      const formattedData = {
        labels: response.map((entry) => {
          const maxLength = 13;
          const name =
            entry.name.length > maxLength
              ? `${entry.name.substring(0, maxLength)}...`
              : entry.name;
          return name;
        }),
        data: response.map((entry) => entry.count),
      };

      setData(formattedData);
    };
    fetchData();
  }, [api]);

  const chartData = {
    labels: data?.labels,
    datasets: [
      {
        label: 'Vodka type',
        data: data?.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(129, 215, 219, 0.2)',
          'rgba(106, 230, 69, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(129, 215, 219, 1)',
          'rgba(106, 230, 69, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return data ? <Pie data={chartData} /> : <div>Loading</div>;
};

export default VodkaChart;
