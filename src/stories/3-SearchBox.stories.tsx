import React, { useState, useEffect } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SearchBox from '../components/searchBox';

/**
 * HELPERS
 */
async function fakeAsync(waitTime = 1500): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, waitTime));
}

type User = { id: number; name: string };
const fakeUsers: User[] = [
  { id: 1, name: 'George' },
  { id: 2, name: 'Mike' },
  { id: 3, name: 'Gabriella' },
  { id: 4, name: 'Dan' },
  { id: 5, name: 'Christine' },
];

/**
 * EXAMPLES
 */
export const Regular: React.FC = () => (
  <div>
    <SearchBox
      delay={number('Debounce delay (milliseconds)', 500)}
      onChange={action('Searching...')}
    />
  </div>
);

export const WithLoadingIndicator: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    fakeAsync(2000).then(() => setIsFetching(false));
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

export const InTheWild: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(fakeUsers);

  useEffect(() => {
    setIsFetching(true);

    fakeAsync(1000).then(() => {
      if (!searchValue) {
        setFilteredUsers(fakeUsers);
      } else {
        const newData = filteredUsers.filter((user: User) => {
          return user.name.toLowerCase().includes(searchValue.toLowerCase());
        });

        setFilteredUsers(newData);
        setIsFetching(false);
      }
    });
  }, [searchValue]);

  return (
    <div
      style={{
        padding: '12px',
        border: '5px solid #444',
        borderRadius: '8px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SearchBox
          isLoading={isFetching}
          onChange={(val): void => setSearchValue(val)}
        />
      </div>

      <div>
        <h2 style={{ borderBottom: '3px solid #777' }}>Name</h2>
        {!filteredUsers.length && <div>No results</div>}
        {filteredUsers.map((user: User) => {
          return (
            <div key={user.id}>
              <p style={{ margin: '4px', fontSize: '18px' }}>{user.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default {
  title: 'Search Box',
  decorators: [withKnobs],
};
