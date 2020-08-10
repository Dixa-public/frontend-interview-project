import React from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import Collapsible from '../components/collapsible';

export const regular: React.FC = () => (
  <div>
    <div>
      <Collapsible user={{
        id: '1234-1234-1234-1234',
        name: 'John Something',
        email: '',
        phoneNumber: '+4560860931',
      }}>
        <div>
          <p>More Text about the collapsible</p>
        </div>
      </Collapsible>
    </div>
    <br />
    <div>
      <Collapsible
        id="1234-1234-1234-1234"
        name="John Something"
        email=""
        phoneNumber="+4512341234">
        <div>
          <p>More Text about the collapsible</p>
        </div>
      </Collapsible>
    </div>
  </div>
);

export default {
  title: 'Collapsible',
  decorators: [withKnobs],
};
