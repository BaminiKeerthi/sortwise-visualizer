/**
 * Radix Sort Visualizer Page
 */

import { useState } from 'react';
import { AlgorithmLayout } from '@/components/AlgorithmLayout';
import { SortingInput } from '@/components/SortingInput';
import { StepHistory } from '@/components/StepHistory';
import { radixSort } from '@/algorithms/radixSort';
import { Step } from '@/utils/sortingHelpers';

export default function RadixSortPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSort = (array: number[]) => {
    setIsRunning(true);
    const sortingSteps = radixSort(array);
    setSteps(sortingSteps);
    setIsRunning(false);
  };

  const handleReset = () => {
    setSteps([]);
  };

  return (
    <AlgorithmLayout
      title="Radix Sort"
      description="Radix Sort processes digits from least significant to most significant, using counting sort at each digit position. It's particularly efficient for sorting integers or strings with a fixed number of digits/characters. The algorithm avoids comparisons entirely."
      complexity={{
        time: { best: 'O(d(n+k))', average: 'O(d(n+k))', worst: 'O(d(n+k))' },
        space: 'O(n+k)',
      }}
    >
      <div className="space-y-8">
        <SortingInput
          onSort={handleSort}
          onReset={handleReset}
          isRunning={isRunning}
        />
        
        <div className="p-6 rounded-2xl bg-card/30 border border-border/50 min-h-[400px]">
          <StepHistory steps={steps} />
        </div>
      </div>
    </AlgorithmLayout>
  );
}
