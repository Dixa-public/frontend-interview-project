import React, { FC } from 'react';
import classnames from 'classnames';
import styles from './avatar.module.scss';

interface Props {
  className?: string;
  gradientSeed: string;
  text: string;
}
// what does p, q, t, parameters stands for? I would suggest writing whole words
const hue2rgb = function(p: number, q: number, t: number): number {
  //again what is newT?
  let newT = t;
  if (newT < 0) newT += 1;
  if (newT > 1) newT -= 1;
  /* I could add a more informative name for the following calculations, 
         if I would know what what the above mentioned variables stand for */
  const calc1 = p + (q - p) * 6 * newT;
  const calc2 = p + (q - p) * (2 / 3 - newT) * 6;
  if (newT < 1 / 6) return calc1;
  if (newT < 1 / 2) return q;
  if (newT < 2 / 3) return calc2;
  return p;
};

function hslToRgb(hue: number, saturation: number, ligthness: number): Array<number> {
  let red;
  let green;
  let blue;

  if (saturation === 0) {
    red = ligthness;
    green = ligthness;
    blue = ligthness;
  } else {
    const calcQ1 = ligthness * (1 + saturation);
    const calcQ2 = ligthness + saturation - ligthness * saturation;
    const q = ligthness < 0.5 ? calcQ1 : calcQ2;
    const p = 2 * ligthness - q;
    const calcHue1 = hue + 1 / 3;
    const calcHue2 = hue - 1 / 3;

    red = hue2rgb(p, q, calcHue1);
    green = hue2rgb(p, q, hue);
    blue = hue2rgb(p, q, calcHue2);
  }

  const roundedRed = Math.round(red * 255);
  const roundedGreen = Math.round(green * 255);
  const roundedBlue = Math.round(blue * 255);

  return [roundedRed, roundedGreen, roundedBlue];
}

function generateGradient(id: string): string {
  let hue = 0;
  let saturation1 = 65;
  let saturation2 = 65;
  const lightness1 = 56;
  let lightness2 = 80;
  let gap = 25;
  let angle = 50;

  for (let i = 0; i < id.length; i += 1) {
    hue += id.charCodeAt(i);
  }
  function hueCheck() {
    return hue % 3 === 0 && hue % 360 > 40 && hue % 360 < 320;
  }
  if (hueCheck()) {
    gap = 115 + (hue % 10);
    lightness2 = 80;
  } else {
    gap += hue % 20;
  }
  angle += hue % 360;
  angle = 45 + Math.floor(angle / 90) * 90;
  saturation1 += hue % 15;
  saturation2 += hue % 15;
  hue %= 360;

  const hueCalc2 = ((hue + gap) % 360) / 360;

  const color1 = hslToRgb(hue / 360, saturation1 / 100, lightness1 / 100);
  const color2 = hslToRgb(hueCalc2, saturation2 / 100, lightness2 / 100);

  return `linear-gradient(${angle}deg, rgb(${color1[0]},${color1[1]},${color1[2]}) 0%, rgb(${color2[0]},${color2[1]},${color2[2]}) 100%)`;
}

const AvatarText: FC<Props> = (props) => {
  const { className, gradientSeed, text, ...otherProps } = props;

  // `unknown type` - https://mariusschulz.com/blog/the-unknown-type-in-typescript
  const styleOverrides: Record<string, unknown> = {};
  let label = '';
  let isBackground = false;

  // setting background and label of avatar based on props
  if (gradientSeed && text) {
    label = text;
    styleOverrides.background = generateGradient(gradientSeed);
    isBackground = true;
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: isBackground,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {!!label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default AvatarText;
