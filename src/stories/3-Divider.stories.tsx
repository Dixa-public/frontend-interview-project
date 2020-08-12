import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import Divider from '../components/divider';

export const regular: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <Divider />
  </div>
);

export const withSize: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <Divider size="4px" color={text('color', '')} />
  </div>
);

export const withText: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <Divider color={text('color3', 'tomato')} text="Hello" />
  </div>
);

export const withDotted: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <Divider size="3px" color={text('color3', 'tomato')} type="dotted" />
  </div>
);

export const withDash: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <Divider size="3px" color={text('color3', 'tomato')} type="dashed" />
  </div>
);

export default {
  title: 'Divider',
  decorators: [withKnobs],
};
