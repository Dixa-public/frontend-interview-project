import React, { FC } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Image from '../image';
import styles from './avatar.module.scss';

interface Props {
  user?: Optional<User>;
  className?: Optional<string>;
  color?: string;
  gradientSeed?: string;
  imageSrc?: string;
  text?: string;
  iconKey?: string;
  isSmallIcon?: boolean;
}

function hslToRgb(h: number, s: number, l: number): Array<number> {
  let r;
  let g;
  let b;

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const hue2rgb = function hue2rgb(p: number, q: number, t: number): number {
      let newT = t;
      if (newT < 0) newT += 1;
      if (newT > 1) newT -= 1;
      if (newT < 1 / 6) return p + (q - p) * 6 * newT;
      if (newT < 1 / 2) return q;
      if (newT < 2 / 3) return p + (q - p) * (2 / 3 - newT) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function generateInitials(text = ''): string {
  if (text.indexOf(' ') > -1) {
    // name.
    return text
      .split(' ')
      .map((name: string) => name[0])
      .slice(0, 2)
      .join('');
  }
  if (text.indexOf('@') > -1) {
    // Email.
    return text
      .split('@')
      .map((name: string) => name[0])
      .slice(0, 2)
      .join('');
  }
  if (text.indexOf('+') > -1) {
    // Phone number e.164 format.
    return text.slice(-2);
  }
  return text.charAt(0);
}

function generateIdGradient(id: string): string {
  let hue = 0;
  let s1 = 65;
  let s2 = 65;
  const l1 = 56;
  let l2 = 80;
  let gap = 25;
  let angle = 50;
  for (let i = 0; i < id.length; i += 1) {
    hue += id.charCodeAt(i);
  }
  if (hue % 3 === 0 && hue % 360 > 40 && hue % 360 < 320) {
    gap = 115 + (hue % 10);
    l2 = 80;
  } else {
    gap += hue % 20;
  }
  angle += hue % 360;
  angle = 45 + Math.floor(angle / 90) * 90;
  s1 += hue % 15;
  s2 += hue % 15;
  hue %= 360;

  const color1 = hslToRgb(hue / 360, s1 / 100, l1 / 100);
  const color2 = hslToRgb(((hue + gap) % 360) / 360, s2 / 100, l2 / 100);

  return `linear-gradient(${angle}deg, rgb(${color1[0]},${color1[1]},${color1[2]}) 0%, rgb(${color2[0]},${color2[1]},${color2[2]}) 100%)`;
}

const Avatar: FC<Props> = (props) => {
  const {
    user,
    className,
    color,
    gradientSeed,
    imageSrc,
    iconKey,
    text,
    isSmallIcon,
    ...otherProps
  } = props;

  // `unknown type` - https://mariusschulz.com/blog/the-unknown-type-in-typescript
  const styleOverrides: Record<string, unknown> = {};
  let initials = '';
  let imageTag = null;
  let isBackground = false;
  let printIcon = null;

  if (imageSrc) {
    imageTag = <Image className={styles.image} src={imageSrc} />;
  } else if (color) {
    styleOverrides.backgroundColor = color;
    isBackground = true;
  } else if (gradientSeed) {
    styleOverrides.background = generateIdGradient(gradientSeed);
    isBackground = true;
  } else if (user) {
    if (user.avatarUrl) {
      imageTag = (
        <Image
          className={styles.image}
          src={user.avatarUrl}
          alt={user.name || ''}
        />
      );
    } else {
      styleOverrides.background = generateIdGradient(user.id);
      isBackground = true;
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
      [styles.avatarSmallIcon]: isSmallIcon,
    },
    className,
  );

  if (text) {
    initials = text;
  } else if (user && !user.avatarUrl) {
    const seed =
      user.name || user.displayName || user.email || user.phoneNumber || null;
    if (seed === null || seed === 'anonymous') {
      // Anonymous user.
      printIcon = <Icon name="user-secret" className={styles.icon} />;
      styleOverrides.background = '#CACACA';
      isBackground = true;
    } else {
      initials = generateInitials(seed);
    }
  }

  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {imageTag}
      {!!initials && <span className={styles.text}>{initials}</span>}
      {!!iconKey && <Icon name={iconKey} className={styles.icon} />}
      {printIcon}
    </div>
  );
};

export default Avatar;
