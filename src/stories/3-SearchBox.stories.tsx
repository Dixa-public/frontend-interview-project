import React from 'react';
import SearchBox from '../components/searchBox';

export const regular: React.FC = () => (
  <div>
    <SearchBox onChange={(val: string): void => console.log('val: ', val)} />
  </div>
);

export default {
  title: 'Search Box',
};
