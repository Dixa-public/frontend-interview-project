import React, { useState, useEffect } from 'react';
import SearchBox from '../components/searchBox';

/**
 * HELPERS
 */
async function fakeAsync(waitTime = 1500): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, waitTime));
}

/**
 * EXAMPLES
 */
export const regular: React.FC = () => (
  <div>
    <SearchBox onChange={(val: string): void => console.log('val: ', val)} />
  </div>
);

export const asyncLoad: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    fakeAsync(2500).then(() => setIsFetching(false));
  }, [searchValue]);

  return (
    <div>
      <SearchBox
        isLoading={isFetching}
        onChange={(val): void => setSearchValue(val)}
      />
    </div>
  );
};

export default {
  title: 'Search Box',
};
