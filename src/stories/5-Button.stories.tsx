import React from 'react';
import Button from '../components/button';

export const regular: React.FC = () => (
  <div>
    <Button
        variant="default"
        size="small"
        type="submit"
        value="click me I'm default small"
    />
    <Button
        variant="success"
        size="big"
        type="submit"
        value="click me I'm a success bigger"
    />
    <Button
        variant="info"
        size="small"
        type="submit"
        value="click me I'm a info small"
    />
  </div>
);

export default {
  title: 'Button'
};
