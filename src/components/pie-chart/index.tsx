import React, { memo } from 'react';
import styles from './pie-chart.module.scss';

interface ChartData {
  color: string;
  value: number;
}

interface Props {
  className?: string;
  data: Array<ChartData>;
  radius: number;
  separatorColor: string;
  separatorDegree: number;
  showPercentages?: boolean;
  showValues?: boolean;
}

const PieChart: React.FC<Props> = ({
  className,
  data,
  radius,
  separatorColor,
  separatorDegree,
  showPercentages,
  showValues,
  ...otherProps
}) => {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  const percentages = data.map((item) => item.value / totalValue);
  const degrees = percentages.map((item) => item * 360);

  const conicGradientData: Array<string> = [];
  const degreeAcc = [0];
  data.forEach((item, idx) => {
    let from = degreeAcc[degreeAcc.length - 1];
    const to = idx + 1 < data.length ? ` ${from + degrees[idx]}deg` : '';
    conicGradientData.push(`${separatorColor} ${from}deg`);
    from += separatorDegree;
    conicGradientData.push(`${item.color} ${from}deg${to}`);
    degreeAcc.push(degreeAcc[degreeAcc.length - 1] + degrees[idx]);
  });

  const size = radius * 2;
  const styleOverrides: Record<string, unknown> = {
    background: `conic-gradient(${conicGradientData.join(', ')})`,
    borderColor: separatorColor,
    width: `${size}px`,
    height: `${size}px`,
  };

  const labels = data.map((item, idx) => {
    const angle = degreeAcc[idx] + (degreeAcc[idx + 1] - degreeAcc[idx]) / 2;
    const angleRad = (angle * Math.PI) / 180;
    const distanceFromCenter = radius / 1.5;
    const sin = Math.abs(Math.sin(angleRad));
    const cos = Math.abs(Math.cos(angleRad));

    let left;
    let top;
    if (angle < 90) {
      left = radius + sin * distanceFromCenter;
      top = radius - cos * distanceFromCenter;
    } else if (angle < 180) {
      left = radius + sin * distanceFromCenter;
      top = radius + cos * distanceFromCenter;
    } else if (angle < 270) {
      left = radius - sin * distanceFromCenter;
      top = radius + cos * distanceFromCenter;
    } else {
      left = radius - sin * distanceFromCenter;
      top = radius - cos * distanceFromCenter;
    }

    return (
      <div key={item.color} className={styles.label} style={{ top, left }}>
        {showValues && <div className={styles.text}>{item.value}</div>}
        {showPercentages && (
          <div className={styles.text}>
            {+parseFloat(`${percentages[idx] * 100}`).toFixed(1)}
            <span>%</span>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={className} {...otherProps}>
      <div className={styles.pie} style={styleOverrides}>
        {labels}
      </div>
    </div>
  );
};

export default memo(PieChart);
