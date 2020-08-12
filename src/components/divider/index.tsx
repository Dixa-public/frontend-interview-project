import * as React from 'react';
import styled from 'styled-components';

export interface DividerProps {
  type?: 'solid' | 'dashed' | 'dotted' | string;
  textOrientation?: 'center' | 'right' | 'left';
  size?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  text?: string;
}

const Divider: React.FC<DividerProps> = (props) => {
  const {
    size = '1px',
    type = 'solid',
    color = '#bbb',
    className,
    children,
    text,
    textOrientation = 'center',
    ...restProps
  } = props;

  const style: Record<string, unknown> = {
    borderTop: `${size} ${type} ${color}`,
  };

  const textStyles: Record<string, unknown> = {
    color,
    textAlign: textOrientation,
    lineHeight: size,
  };

  const StyledHr = styled.hr`
    position: relative;
    outline: 0;
    border: 0;
    height: 1.5em;
    &:before {
      content: '';
      background: linear-gradient(to right, transparent, #818078, transparent);
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
    }
    &:after {
      content: '${text}';
      position: relative;
      display: inline-block;
      color: '${color}';
      padding: 0 0.5em;
      line-height: 1.5em;
      background-color: #fcfcfa;
    }
  `;

  return text ? (
    <StyledHr {...restProps} style={textStyles} className="hrText" />
  ) : (
    <hr {...restProps} style={style} />
  );
};

export default Divider;
