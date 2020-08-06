import React, { FC } from 'react';
import classnames from 'classnames';
import Icon from './icon';
import Image from './image';
import styles from './avatar.module.scss';
import { generateGradient } from '../../helpers/generateGradient';

interface Props {
  user: Optional<User>;
  className?: string;
}
function generateInitials(userInfo = ''): string {
  if (userInfo.indexOf(' ') > -1) {
    // from full name.
    const fullnameInitials = userInfo
      .split(' ')
      .map((name: string) => name[0])
      .slice(0, 2)
      .join('');
    return fullnameInitials;
  }
  if (userInfo.indexOf('@') > -1) {
    // from Email.
    const emailInitials = userInfo
      .split('@')
      .map((name: string) => name[0])
      .slice(0, 2)
      .join('');
    return emailInitials;
  }
  if (userInfo.indexOf('+') > -1) {
    // from Phone number e.164 format.
    const phonenrIntials = userInfo.slice(-2);
    return phonenrIntials;
  } // from one name
  const nameInitials = userInfo.charAt(0);
  return nameInitials;
}

const AvatarUser: FC<Props> = (props) => {
  const { user, className, ...otherProps } = props;

  // `unknown type` - https://mariusschulz.com/blog/the-unknown-type-in-typescript
  const styleOverrides: Record<string, unknown> = {};
  let label = '';
  let imageTag = null;
  let isBackground = false;
  let printIcon = null;

  // setting background and label of avatar based on props
  if (user && user.avatarUrl) {
    imageTag = <Image className={styles.image} src={user.avatarUrl} alt={user.name || ''} />;
  } else if (user && !user.avatarUrl) {
    styleOverrides.background = generateGradient(user.id);
    isBackground = true;
    const seed = user.name || user.email || user.phoneNumber || user.id;
    if (seed === user.id) {
      // Anonymous user.
      printIcon = <Icon name="user-secret" className={styles.icon} />;
      styleOverrides.background = '#CACACA';
      isBackground = true;
    } else {
      label = generateInitials(seed);
    }
  } else if (user === null) {
    // Unassigned
    printIcon = <Icon name="user-slash" className={styles.icon} />;
    styleOverrides.background = '#CACACA';
    isBackground = true;
  } else {
    styleOverrides.background = '#CACACA';
    isBackground = true;
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: isBackground,
      [styles.image]: imageTag !== null,
    },
    className,
  );
  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {imageTag}
      {!!label && <span className={styles.label}>{label}</span>}
      {printIcon}
    </div>
  );
};

export default AvatarUser;
