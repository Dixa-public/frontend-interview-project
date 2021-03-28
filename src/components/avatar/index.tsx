import React, { FC } from 'react';

import { AvatarProps } from './AvatarProps';
import { AvatarContextProvider } from './hooks';
import IconAvatar from './IconAvatar';
import ImageAvatar from './ImageAvatar';
import TextAvatar from './TextAvatar';

const Avatar: FC<AvatarProps> = (props) => {
  return (
    <AvatarContextProvider value={props}>
      <IconAvatar />
      <ImageAvatar />
      <TextAvatar />
    </AvatarContextProvider>
  );
};

export default Avatar;
