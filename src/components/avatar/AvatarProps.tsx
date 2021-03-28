import React from 'react';

type DivProps = React.DetailedHTMLProps<
  React.AllHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export interface AvatarProps extends DivProps {
  user?: Optional<User>;
  color?: string;
  gradientSeed?: string;
  imageSrc?: string;
  text?: string;
  iconKey?: string;
  isSmallIcon?: boolean;
}
