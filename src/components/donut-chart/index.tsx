import React, { FC } from 'react';
import classnames from 'classnames';
import styles from './donut-chart.module.scss';

interface ChartData {
  color: string;
  value: number;
}

interface SvgData {
  color: string;
  pct: number;
}

interface Props {
  className?: Optional<string>;
  count: string;
  data: Array<ChartData>;
}

const RADIUS = 30;
const STROKE = 12;
const CIRCUMFERENCE = RADIUS * Math.PI * 2;

function calculateDasharray(pct: number): string {
  const paintedPart = (CIRCUMFERENCE * pct) / 100;
  return `${paintedPart} ${CIRCUMFERENCE - paintedPart}`;
}

function calculateOffset(pct: number): number {
  return (CIRCUMFERENCE * (25 - pct)) / 100;
}

function getSlicesAsPercentages(data: Array<ChartData>): Array<SvgData> {
  const total = data.reduce(
    (acc: number, item: { value: number }) => acc + item.value,
    0,
  );

  if (total === 0) return [];

  return data.map((item: ChartData) => ({
    color: item.color,
    pct: (item.value / total) * 100,
  }));
}

const DonutChart: FC<Props> = (props) => {
  const { className, data, count, ...otherProps } = props;

  const rootClass = classnames(
    {
      [styles.root]: true,
      [styles.rootNoWaiting]: count === '0',
    },
    className,
  );

  let total = 0;

  const slices = getSlicesAsPercentages(data);

  return (
    <div {...otherProps} className={rootClass}>
      <span className={styles.counter}>{count}</span>
      <svg height={RADIUS * 2 + STROKE} width={RADIUS * 2 + STROKE}>
        {slices.map((slice: SvgData) => {
          const offset = total;
          total += slice.pct;

          return (
            <circle
              key={offset}
              r={RADIUS}
              fill="none"
              cx={RADIUS + STROKE / 2}
              cy={RADIUS + STROKE / 2}
              stroke={slice.color}
              strokeDasharray={calculateDasharray(slice.pct)}
              strokeWidth={STROKE}
              strokeDashoffset={calculateOffset(offset)}
            />
          );
        })}
        {slices.length === 0 && (
          <circle
            r={RADIUS}
            fill="none"
            cx={RADIUS + STROKE / 2}
            cy={RADIUS + STROKE / 2}
            stroke="#dcdcdc"
            strokeWidth={STROKE}
          />
        )}
      </svg>
    </div>
  );
};

export default DonutChart;
