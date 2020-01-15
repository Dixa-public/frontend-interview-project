import React from 'react';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import Avatar from '../components/avatar';

export default {
  title: 'Avatar',
  decorators: [withKnobs],
};

export const withGradientSeed: React.FC = () => (
  <div>
    <div style={{ width: '45px' }}>
      <Avatar
        text={text('Initials', 'KT')}
        gradientSeed={text('Gradient seed', '1234-1234-1234-1234')}
      />
    </div>
    <br />
    <div style={{ width: '32px' }}>
      <Avatar
        text={text('Initials (small)', 'CC')}
        gradientSeed={text('Gradient seed (small)', '5678-5678-5678-5678')}
      />
    </div>
  </div>
);

export const withIcon: React.FC = () => (
  <div>
    <div style={{ width: '45px' }}>
      <Avatar iconKey="paper-plane" color="#5644D8" />
    </div>
    <br />
    <div style={{ width: '45px' }}>
      <Avatar iconKey="clock" color={color('Background', '#7BC4A9')} />
    </div>
    <br />
    <div style={{ width: '45px' }}>
      <Avatar iconKey="salesforce" color="#18a8d8" />
    </div>
    <br />
    <div style={{ width: '45px' }}>
      <Avatar iconKey="magento" color="#c14800" />
    </div>
    <br />
    <div style={{ width: '32px' }}>
      <Avatar isSmallIcon iconKey="paper-plane" color="#5644D8" />
    </div>
    <br />
    <div style={{ width: '32px' }}>
      <Avatar
        isSmallIcon
        iconKey="clock"
        color={color('Background', '#7BC4A9')}
      />
    </div>
    <br />
    <div style={{ width: '32px' }}>
      <Avatar isSmallIcon iconKey="salesforce" color="#18a8d8" />
    </div>
    <br />
    <div style={{ width: '32px' }}>
      <Avatar isSmallIcon iconKey="magento" color="#c14800" />
    </div>
  </div>
);

export const withImage: React.FC = () => (
  <div>
    <div style={{ width: '45px' }}>
      <Avatar imageSrc="https://global-uploads.webflow.com/5873645dcda6383b06dc220a/5b9a825ea6ef6021d01d6774_DIXA-426-2.jpg" />
    </div>
    <br />
    <div style={{ width: '45px' }}>
      <Avatar imageSrc="https://global-uploads.webflow.com/5873645dcda6383b06dc220a/5b645adbc899f51886b6f1dd_DSC_4137.jpg" />
    </div>
  </div>
);

export const withUser: React.FC = () => (
  <div>
    <div style={{ width: '45px' }}>
      <Avatar
        user={{
          id: '1234-1234-1234-1234',
          avatarUrl:
            'https://dixa-uploads.s3-eu-west-1.amazonaws.com/e7a04fc4-bba8-48a8-a92e-013606a188a6/user_avatar/5b613833-bc48-462b-aa1b-c43b4e6dc928.png',
          name: 'John Doe',
          email: 'email@dixa.com',
          phoneNumber: '+4560860931',
        }}
      />
    </div>
    <br />
    <div style={{ width: '45px' }}>
      <Avatar
        user={{
          id: '1234-1234-1234-1234',
          name: 'John Doe',
          email: 'email@dixa.com',
          phoneNumber: '+4560860931',
        }}
      />
    </div>
  </div>
);

export const withInitials: React.FC = () => (
  <div>
    <small>User one name John - should print &quot;J&quot;.</small>
    <div style={{ width: '45px' }}>
      <Avatar
        user={{
          id: '1234-1234-1234-1234',
          name: 'John',
          email: '',
          phoneNumber: '+4560860931',
        }}
      />
    </div>
    <br />
    <small>
      User with only phone number (+4560860931) - should print &quot;31&quot;.
    </small>
    <div style={{ width: '45px' }}>
      <Avatar
        user={{
          id: '1234-1234-1234-1234',
          name: '',
          email: '',
          phoneNumber: '+4560860931',
        }}
      />
    </div>
    <br />
    <small>
      User with name (John Something), email and phone number - should print
      &quot;JS&quot;.
    </small>
    <div style={{ width: '45px' }}>
      <Avatar
        user={{
          id: '1234-1234-1234-1234',
          name: 'John Something',
          email: 'john@gmail.com',
          phoneNumber: '+4560860931',
        }}
      />
    </div>
    <br />
    <small>
      No name - only email (john@gmail.com) and phone number - should print
      &quot;JG&quot;.
    </small>
    <div style={{ width: '45px' }}>
      <Avatar
        user={{
          id: '1234-1234-1234-1234',
          name: '',
          email: 'john@gmail.com',
          phoneNumber: '+4560860931',
        }}
      />
    </div>
    <br />
    <small>
      No email - only name (John Something) and phone number - should print
      &quot;JS&quot;.
    </small>
    <div style={{ width: '45px' }}>
      <Avatar
        user={{
          id: '1234-1234-1234-1234',
          name: 'John Something',
          email: '',
          phoneNumber: '+4560860931',
        }}
      />
    </div>
    <br />
    <h6>Anonymous - only id</h6>
    <div style={{ width: '45px' }}>
      <Avatar user={{ id: '1234-1234-1234-1234' }} />
    </div>
    <br />
    <h6>Unassigned</h6>
    <div style={{ width: '45px' }}>
      <Avatar user={null} />
    </div>
  </div>
);
