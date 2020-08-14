import React from 'react';
import { withKnobs} from '@storybook/addon-knobs';

import TagInput from '../components/tag_input/index';


export const isSmall: React.FC = () => (
  <div>
    <TagInput
      list={[
        { id: 1, text: 'small 1' },
        { id: 2, text: 'small 2' }
      ]}
      isSmall
    />
  </div>
    
  
);
export const isMedium: React.FC = () => (
  <div>
    <TagInput
      list={[
        { id: 1, text: 'medium 1' },
        { id: 2, text: 'meduim 2' }
      ]}
      isMedium
    />
  </div>
    
  
);
export const isLarge: React.FC = () => (
  <div>
    <TagInput
      list={[
        { id: 1, text: 'large 1' },
        { id: 2, text: 'large 2' }
      ]}
      isLarge
    />
  </div>
    
  
);


export default {
  title: 'TagInput',
  decorators: [withKnobs],
};
