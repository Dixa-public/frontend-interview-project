import React, { FC, Profiler } from 'react';
import { css } from 'emotion';

const itemStyles = css`
  margin-right: 15px;
  width: 100px;
  text-align: center;
  font-size: 30px;

  p {
    font-size: 12px;
  }
`;

interface Props {
  component: React.ReactNode;
  id: string;
  duration: number;
  onRenderCallback: (id: string, phase: string, actualDuration: number) => void;
}

const PerformanceRunner: FC<Props> = ({
  id,
  onRenderCallback,
  component,
  duration,
}) => {
  return (
    <div className={itemStyles}>
      <Profiler id={id} onRender={onRenderCallback}>
        {component}
      </Profiler>
      <p>{duration === undefined ? 'running...' : duration.toPrecision(10)}</p>
    </div>
  );
};

export default PerformanceRunner;
