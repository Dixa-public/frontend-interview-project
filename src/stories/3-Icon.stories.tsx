import React from 'react';
import Icon from '../components/icon';

export const regular: React.FC = () => (
  <div>
    <Icon
      name="user"
      isSolid={true}
    />
    <Icon
      name="user-slash"
      isSolid={false}
    />
  </div>
);

export default {
  title: 'Icon'
};
