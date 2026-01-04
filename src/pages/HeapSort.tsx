/**
 * Heap Sort Visualizer Page
 */

import { useState } from 'react';
import { AlgorithmLayout } from '@/components/AlgorithmLayout';
import { SortingInput } from '@/components/SortingInput';
import { StepHistory } from '@/components/StepHistory';
import { heapSort } from '@/algorithms/heapSort';
import { Step } from '@/utils/sortingHelpers';

export default function HeapSortPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSort = (array: number[]) => {
    setIsRunning(true);
    const sortingSteps = heapSort(array);
    setSteps(sortingSteps);
    setIsRunning(false);
  };

  const handleReset = () => {
    setSteps([]);
  };

  return (
    <AlgorithmLayout
      title="Heap Sort"
      description="Heap Sort uses a binary heap data structure. It first builds a max-heap, then repeatedly extracts the maximum element and places it at the end. Unlike Quick Sort, it guarantees O(n log n) performance in all cases and is in-place."
      complexity={{
        time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
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
