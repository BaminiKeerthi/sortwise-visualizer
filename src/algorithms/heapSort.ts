/**
 * Heap Sort Algorithm
 * 
 * Heap Sort uses a binary heap data structure to sort elements.
 * It first builds a max-heap, then repeatedly extracts the maximum
 * element and places it at the end of the array.
 * 
 * Time Complexity:
 * - Best: O(n log n)
 * - Average: O(n log n)
 * - Worst: O(n log n)
 * 
 * Space Complexity: O(1) - in-place sorting
 * 
 * Characteristics:
 * - Not stable
 * - In-place
 * - Guaranteed O(n log n) performance
 * - Good for systems with limited memory
 */

import { Step, createInitialStep, copyArray, swap, ArrayElement } from '@/utils/sortingHelpers';

export function heapSort(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const arr = copyArray(inputArray);
  const n = arr.length;
  let stepNumber = 0;

  // Track sorted positions
  const sortedPositions = new Set<number>();

  // Step 0: Show initial array
  steps.push(createInitialStep(arr));

  /**
   * Helper function to create a visualization step
   */
  function addStep(
    type: 'compare' | 'swap' | 'sorted' | 'partition',
    description: string,
    highlightIndices: number[] = [],
    highlightState: 'compare' | 'swap' | 'pivot' = 'compare'
  ) {
    stepNumber++;

    const array: ArrayElement[] = arr.map((value, index) => {
      if (sortedPositions.has(index)) {
        return { value, state: 'sorted' as const };
      }
      if (highlightIndices.includes(index)) {
        return { value, state: highlightState };
      }
      return { value, state: 'normal' as const };
    });

    steps.push({
      stepNumber,
      type,
      description,
      array,
      highlightIndices,
    });
  }

  /**
   * Heapify a subtree rooted at index i
   * n is the size of the heap
   */
  function heapify(heapSize: number, rootIndex: number) {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    // Show the node we're heapifying
    addStep(
      'partition',
      `Heapifying subtree at index ${rootIndex} (value: ${arr[rootIndex]})`,
      [rootIndex],
      'pivot'
    );

    // Compare with left child
    if (left < heapSize) {
      addStep(
        'compare',
        `Comparing root ${arr[largest]} with left child ${arr[left]}`,
        [largest, left]
      );

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < heapSize) {
      addStep(
        'compare',
        `Comparing current largest ${arr[largest]} with right child ${arr[right]}`,
        [largest, right]
      );

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    // If largest is not root, swap and continue heapifying
    if (largest !== rootIndex) {
      addStep(
        'swap',
        `Swapping ${arr[rootIndex]} with ${arr[largest]} to maintain heap property`,
        [rootIndex, largest],
        'swap'
      );

      swap(arr, rootIndex, largest);

      // Recursively heapify the affected subtree
      heapify(heapSize, largest);
    }
  }

  // Phase 1: Build Max Heap
  stepNumber++;
  steps.push({
    stepNumber,
    type: 'partition' as any,
    description: 'Phase 1: Building Max Heap from the array',
    array: arr.map(value => ({ value, state: 'normal' as const })),
  });

  // Build heap (rearrange array)
  // Start from last non-leaf node and heapify each node
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Show completed heap
  stepNumber++;
  steps.push({
    stepNumber,
    type: 'sorted' as any,
    description: 'Max Heap built! Root contains the maximum element.',
    array: arr.map(value => ({ value, state: 'insert' as const })),
  });

  // Phase 2: Extract elements from heap
  stepNumber++;
  steps.push({
    stepNumber,
    type: 'partition' as any,
    description: 'Phase 2: Extracting elements from heap one by one',
    array: arr.map(value => ({ value, state: 'normal' as const })),
  });

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root (max) to end
    addStep(
      'swap',
      `Moving max element ${arr[0]} to position ${i}`,
      [0, i],
      'swap'
    );

    swap(arr, 0, i);

    // Mark this position as sorted
    sortedPositions.add(i);

    addStep(
      'sorted',
      `Element ${arr[i]} is now in its final position`,
      [i],
      'pivot'
    );

    // Heapify reduced heap
    heapify(i, 0);
  }

  // First element is also sorted
  sortedPositions.add(0);

  // Final step
  stepNumber++;
  steps.push({
    stepNumber,
    type: 'sorted',
    description: 'Sorting complete! All elements are in their correct positions.',
    array: arr.map(value => ({ value, state: 'sorted' as const })),
  });

  return steps;
}
