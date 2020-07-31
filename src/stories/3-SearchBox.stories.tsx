import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import SearchBox from '../components/searchBox';

const store = new Store({
  isLoading: false,
});

export const Regular: React.FC = () => (
  <div style={{ width: `${number('width (px)', 200)}px` }}>
    <SearchBox
      delay={number('Debounce delay (milliseconds)', 500)}
      onChange={action('Searching for')}
    />
  </div>
);

export const WithLoadingIndicator: React.FC = () => {
  const handleChange = (val: string): void => {
    action('Searching for')(val);
    store.set({ isLoading: true });

    setTimeout(() => {
      store.set({ isLoading: false });
    }, 1000);
  };

  return (
    <div style={{ width: `${number('width (px)', 200)}px` }}>
      <State store={store}>
        <SearchBox
          isLoading={store.get('isLoading')}
          delay={number('Debounce delay (milliseconds)', 700)}
          onChange={(val): void => handleChange(val)}
        />
      </State>
    </div>
  );
};

export default {
  title: 'Search Box',
  decorators: [withKnobs],
};
