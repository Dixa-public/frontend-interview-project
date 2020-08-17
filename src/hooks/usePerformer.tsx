import { useState } from 'react';

function usePerformer(): [Record<string, number>, (result: number) => void] {
  const [results, setResults] = useState<number[]>([]);

  function addAvatarRun(result: number): void {
    const newResults = results.concat(result);
    setResults(newResults);
  }

  const average = results.reduce((v, c) => v + c, 0) / results.length;
  const max = Math.max(...results);

  return [
    {
      average,
      max,
    },
    addAvatarRun,
  ];
}

export default usePerformer;
