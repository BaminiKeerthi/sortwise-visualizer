/**
 * Insertion Sort Visualizer Page
 */

import { useState } from 'react';
import { AlgorithmLayout } from '@/components/AlgorithmLayout';
import { SortingInput } from '@/components/SortingInput';
import { StepHistory } from '@/components/StepHistory';
import { insertionSort } from '@/algorithms/insertionSort';
import { Step } from '@/utils/sortingHelpers';

export default function InsertionSortPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSort = (array: number[]) => {
    setIsRunning(true);
    const sortingSteps = insertionSort(array);
    setSteps(sortingSteps);
    setIsRunning(false);
  };

  const handleReset = () => {
    setSteps([]);
  };

  return (
    <AlgorithmLayout
      title="Insertion Sort"
      description="Insertion Sort builds the final sorted array one element at a time. It picks each element and inserts it into its correct position among the previously sorted elements. It's efficient for small datasets and nearly sorted arrays."
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
