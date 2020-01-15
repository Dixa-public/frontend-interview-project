import React from 'react';
import DonutChart from '../components/donut-chart';

export const regular: React.FC = () => (
  <div>
    <DonutChart
      count="10"
      data={[
        { value: 100, color: '#FF9430' },
        { value: 400, color: '#46DB75' },
        { value: 159, color: '#00A9FF' },
        { value: 290, color: '#D53341' },
      ]}
    />
    <DonutChart
      count="1"
      data={[
        { value: 2, color: '#FF9430' },
        { value: 2, color: '#46DB75' },
        { value: 56, color: '#00A9FF' },
        { value: 40, color: '#D53341' },
      ]}
    />
    <DonutChart
      count="345"
      data={[
        { value: 50, color: '#FF9430' },
        { value: 10, color: '#46DB75' },
        { value: 30, color: '#00A9FF' },
        { value: 10, color: '#D53341' },
      ]}
    />
    <DonutChart count="0" data={[]} />
  </div>
);

export default {
  title: 'Chart',
};
