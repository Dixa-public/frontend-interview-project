import React from 'react';
import {
  withKnobs,
  boolean,
  color,
  number,
  object,
} from '@storybook/addon-knobs';
import PieChart from '../components/pie-chart';

export const regular: React.FC = () => {
  const dataGroupId = 'Data';
  const layoutGroupId = 'Layout';
  return (
    <div>
      <PieChart
        radius={number('radius', 100, {}, layoutGroupId)}
        separatorColor={color('separatorColor', '#808080', layoutGroupId)}
        separatorDegree={number('separatorDegree', 2, {}, layoutGroupId)}
        showValues={boolean('showValue', false, layoutGroupId)}
        showPercentages={boolean('showPercentage', true, layoutGroupId)}
        data={object(
          'data',
          [
            { color: '#FF9430', value: 5 },
            { color: '#46DB75', value: 3 },
            { color: '#00A9FF', value: 2 },
          ],
          dataGroupId,
        )}
      />
    </div>
  );
};

export default {
  title: 'PieChart',
  decorators: [withKnobs],
};
