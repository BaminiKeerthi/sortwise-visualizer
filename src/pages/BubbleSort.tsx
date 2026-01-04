/**
 * Bubble Sort Visualizer Page
 */

import { useState } from 'react';
import { AlgorithmLayout } from '@/components/AlgorithmLayout';
import { SortingInput } from '@/components/SortingInput';
import { StepHistory } from '@/components/StepHistory';
import { bubbleSort } from '@/algorithms/bubbleSort';
import { Step } from '@/utils/sortingHelpers';

export default function BubbleSortPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSort = (array: number[]) => {
    setIsRunning(true);
    const sortingSteps = bubbleSort(array);
    setSteps(sortingSteps);
    setIsRunning(false);
  };

  const handleReset = () => {
    setSteps([]);
  };

  return (
    <AlgorithmLayout
      title="Bubble Sort"
      description="Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It gets its name because smaller elements 'bubble' to the top of the list."
      complexity={{
        time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
        space: 'O(1)',
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
