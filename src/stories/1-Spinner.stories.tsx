import React from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import Spinner from '../components/spinner';

export const regular: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <Spinner size={number('Size', 32)} color={text('color', '')} />
    <br />
    <Spinner size={number('Size', 32)} color={text('color2', '#00cc00')} />
    <br />
    <Spinner size={number('Size', 32)} color={text('color3', 'tomato')} />
  </div>
);

export default {
  title: 'Spinner',
  decorators: [withKnobs],
};
