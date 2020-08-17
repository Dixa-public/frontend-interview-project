import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import PerformanceRunner from '../components/performance-runner';
import Avatar from '../components/avatar';
import DonutChart from '../components/donut-chart';

// Hello Dixa!
//
// I have created a storybook for benchmarking components using Reacts profiling tool.
//
// The storybook touches on two things i think is important - automation and data-driven.
// I personally enjoy having testrunners informing me on how code changes impacts the service - regression, performance etc.
// I think frontend performance is an interesting problem, which i haven't really explored before, so alot of optimizations can be made.
// It was a fun assignment, i enjoyed myself.
//
// I also choose not to follow the following guidelines:
// - Passing props
// - CSS/SCSS
// - Root class and modifiers
//
// (they were not ignored because i strongly disagree, but more because i slightly prefer other ways or didn't understand the problem)
// (maybe there was more guidelines i didn't follow - that would have been unintentional though)
//
// Cheers,

export const regular: React.FC = () => (
  <div>
    <PerformanceRunner
      name={Avatar.name}
      iterations={20}
      threshold={0.5}
      component={
        <Avatar imageSrc="https://global-uploads.webflow.com/5873645dcda6383b06dc220a/5b9a825ea6ef6021d01d6774_DIXA-426-2.jpg" />
      }
    />
    <PerformanceRunner
      name={Avatar.name}
      iterations={20}
      threshold={0.00001}
      component={
        <Avatar imageSrc="https://global-uploads.webflow.com/5873645dcda6383b06dc220a/5b9a825ea6ef6021d01d6774_DIXA-426-2.jpg" />
      }
    />
    <PerformanceRunner
      name="paper-plane"
      iterations={20}
      threshold={1.0}
      component={<Avatar iconKey="paper-plane" color="#5644D8" />}
    />

    <PerformanceRunner
      name="paper-plane"
      iterations={20}
      threshold={1.0}
      component={(
        <DonutChart
          count="10"
          data={[
            { value: 100, color: '#FF9430' },
            { value: 400, color: '#46DB75' },
            { value: 159, color: '#00A9FF' },
            { value: 290, color: '#D53341' },
          ]}
        />
      )}
    />
    <PerformanceRunner
      name="paper-plane"
      iterations={20}
      threshold={0.015}
      component={(
        <DonutChart
          count="345"
          data={[
            { value: 50, color: '#FF9430' },
            { value: 10, color: '#46DB75' },
            { value: 30, color: '#00A9FF' },
            { value: 10, color: '#D53341' },
          ]}
        />
      )}
    />
  </div>
);

export default {
  title: 'PerformanceRunner',
  decorators: [withKnobs],
};
