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
    <Divider size={text('size', '4px')} color={text('color', '')} />
  </div>
);

export const withText: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <Divider text={text('text', 'Hello')} />
  </div>
);

export const withType: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <Divider
      size="3px"
      color={text('color', 'tomato')}
      type={text('type', 'dashed')}
    />
  </div>
);

export default {
  title: 'Divider',
  decorators: [withKnobs],
};
