/**
 * Merge Sort Visualizer Page
 */

import { useState } from 'react';
import { AlgorithmLayout } from '@/components/AlgorithmLayout';
import { SortingInput } from '@/components/SortingInput';
import { StepHistory } from '@/components/StepHistory';
import { mergeSort } from '@/algorithms/mergeSort';
import { Step } from '@/utils/sortingHelpers';

export default function MergeSortPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSort = (array: number[]) => {
    setIsRunning(true);
    const sortingSteps = mergeSort(array);
    setSteps(sortingSteps);
    setIsRunning(false);
  };

  const handleReset = () => {
    setSteps([]);
  };

  return (
    <AlgorithmLayout
      title="Merge Sort"
      description="Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves. It guarantees O(n log n) performance and is stable, making it ideal for sorting linked lists."
      complexity={{
        time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
        space: 'O(n)',
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
