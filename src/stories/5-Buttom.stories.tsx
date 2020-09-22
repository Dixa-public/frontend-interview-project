import React from 'react';
import Buttom from '../components/buttom';

export const regular: React.FC = () => (
  <div>
    <Buttom
        variant="default"
        size="small"
        type="submit"
        value="click me I'm default small"
    />
    <Buttom
        variant="success"
        size="big"
        type="submit"
        value="click me I'm a success bigger"
    />
    <Buttom
        variant="info"
        size="small"
        type="submit"
        value="click me I'm a info small"
    />
  </div>
);

export default {
  title: 'Buttom'
};
