import React, { FC, useState, useEffect } from 'react';
import { css } from 'emotion';

import usePerformer from '../../hooks/usePerformer';
import Runner from './runner';

const containerStyles = css`
  display: flex;
  flex-wrap: nowrap;
`;

const successStyles = css`
  color: green;
`;

const failedStyles = css`
  color: red;
`;

interface State {
  jobs: {};
}

const initialState: State = {
  jobs: {},
};

interface Props {
  component: React.ReactNode;
  name: string;
  iterations: number; // not really scalable with setState.
  threshold: number;
}

const PerformanceRunner: FC<Props> = ({
  component,
  name,
  iterations,
  threshold,
}) => {
  const [state, setState] = useState<State>(initialState);
  const [isRunning, setRunning] = useState<boolean>(false);
  const [{ average, max }, addRunValue] = usePerformer();

  function onRenderCallback(
    id: string,
    _phase: string,
    actualDuration: number,
  ): void {
    if (state.jobs[id] === undefined) {
      setState({ ...state, jobs: { ...state.jobs, [id]: actualDuration } });
      addRunValue(actualDuration);
    }
  }

  function renderResults(): JSX.Element {
    const passed = threshold > average;
    return (
      <>
        <p>{`average : ${average}`}</p>
        <p>{`max : ${max}`}</p>
        <p>{`threshold : ${threshold}`}</p>
        <div className={passed ? successStyles : failedStyles}>
          <p>{passed ? 'passed' : 'failed'}</p>
        </div>
      </>
    );
  }

  useEffect(() => {
    if (Object.keys(state.jobs).length === iterations) {
      setRunning(false);
    }
  }, [state.jobs, iterations]);

  return (
    <div>
      <h1>{`Rendering tests for : ${name}`}</h1>
      <div>{!isRunning && renderResults()}</div>
      <div className={containerStyles}>
        {Array.from(Array(iterations).keys()).map((i) => (
          <div key={`runner-${name}-${i}`}>
            <Runner
              onRenderCallback={onRenderCallback}
              component={component}
              id={`${name}-${i}`}
              duration={state.jobs[`${name}-${i}`]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceRunner;
