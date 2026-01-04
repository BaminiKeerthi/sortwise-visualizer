/**
 * Quick Sort Algorithm
 * 
 * Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element
 * and partitions the array around the pivot, placing smaller elements before
 * and larger elements after it.
 * 
 * Time Complexity:
 * - Best: O(n log n)
 * - Average: O(n log n)
 * - Worst: O(n²) when array is already sorted (with bad pivot selection)
 * 
 * Space Complexity: O(log n) for recursion stack
 * 
 * Characteristics:
 * - Not stable
 * - In-place (with recursion stack)
 * - Cache-efficient
 * - Fast in practice
 */

import { Step, createInitialStep, copyArray, swap, ArrayElement } from '@/utils/sortingHelpers';

export function quickSort(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const arr = copyArray(inputArray);
  const n = arr.length;
  let stepNumber = 0;

  // Track fully sorted positions
  const sortedPositions = new Set<number>();

  // Step 0: Show initial array
  steps.push(createInitialStep(arr));

  /**
   * Helper function to create a visualization step
   */
  function addStep(
    type: 'compare' | 'swap' | 'partition' | 'sorted',
    description: string,
    pivotIndex: number = -1,
    highlightIndices: number[] = [],
    highlightState: 'compare' | 'swap' | 'insert' = 'compare'
  ) {
    stepNumber++;

    const array: ArrayElement[] = arr.map((value, index) => {
      if (sortedPositions.has(index)) {
        return { value, state: 'sorted' as const };
      }
      if (index === pivotIndex) {
        return { value, state: 'pivot' as const };
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
   * Partition function using Lomuto partition scheme
   * Uses last element as pivot
   */
  function partition(low: number, high: number): number {
    const pivot = arr[high];
    
    addStep(
      'partition',
      `Partitioning [${low}..${high}] with pivot = ${pivot}`,
      high
    );

    let i = low - 1; // Index of smaller element

    for (let j = low; j < high; j++) {
      // Compare current element with pivot
      addStep(
        'compare',
        `Comparing arr[${j}]=${arr[j]} with pivot ${pivot}`,
        high,
        [j]
      );

      if (arr[j] < pivot) {
        i++;
        
        if (i !== j) {
          addStep(
            'swap',
            `${arr[j]} < ${pivot}, swapping arr[${i}]=${arr[i]} with arr[${j}]=${arr[j]}`,
            high,
            [i, j],
            'swap'
          );
          
          swap(arr, i, j);
        } else {
          addStep(
            'partition',
            `${arr[j]} < ${pivot}, element already in correct partition`,
            high,
            [j],
            'insert'
          );
        }
      }
    }

    // Place pivot in its correct position
    const pivotFinalPos = i + 1;
    
    if (pivotFinalPos !== high) {
      addStep(
        'swap',
        `Placing pivot ${pivot} at its final position ${pivotFinalPos}`,
        high,
        [pivotFinalPos, high],
        'swap'
      );
      
      swap(arr, pivotFinalPos, high);
    }

    // Mark pivot position as sorted
    sortedPositions.add(pivotFinalPos);
    
    addStep(
      'sorted',
      `Pivot ${arr[pivotFinalPos]} is now at its final sorted position ${pivotFinalPos}`,
      pivotFinalPos
    );

    return pivotFinalPos;
  }

  /**
   * Recursive Quick Sort function
   */
  function quickSortRecursive(low: number, high: number) {
    if (low < high) {
      // Partition and get pivot index
      const pivotIndex = partition(low, high);

      // Recursively sort left partition
      quickSortRecursive(low, pivotIndex - 1);
      
      // Recursively sort right partition
      quickSortRecursive(pivotIndex + 1, high);
    } else if (low === high) {
      // Single element is sorted
      sortedPositions.add(low);
      addStep(
        'sorted',
        `Element ${arr[low]} at index ${low} is in its final position`,
        -1,
        [low],
        'insert'
      );
    }
  }

  // Start the recursive sorting
  quickSortRecursive(0, n - 1);

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
