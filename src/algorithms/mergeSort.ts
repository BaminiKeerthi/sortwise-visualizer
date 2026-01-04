/**
 * Merge Sort Algorithm
 * 
 * Merge Sort is a divide-and-conquer algorithm that divides the array
 * into halves, recursively sorts them, and then merges the sorted halves.
 * 
 * Time Complexity:
 * - Best: O(n log n)
 * - Average: O(n log n)
 * - Worst: O(n log n)
 * 
 * Space Complexity: O(n) - requires additional space for merging
 * 
 * Characteristics:
 * - Stable sort
 * - Not in-place (requires extra space)
 * - Predictable performance
 * - Good for linked lists
 */

import { Step, createInitialStep, copyArray, ArrayElement } from '@/utils/sortingHelpers';

export function mergeSort(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const arr = copyArray(inputArray);
  const n = arr.length;
  let stepNumber = 0;

  // Step 0: Show initial array
  steps.push(createInitialStep(arr));

  /**
   * Helper function to create a step with specific states for indices
   */
  function addStep(
    type: 'compare' | 'merge' | 'sorted',
    description: string,
    currentArray: number[],
    highlightIndices: number[] = [],
    mergedIndices: number[] = []
  ) {
    stepNumber++;
    
    const array: ArrayElement[] = currentArray.map((value, index) => {
      if (mergedIndices.includes(index)) {
        return { value, state: 'sorted' as const };
      }
      if (highlightIndices.includes(index)) {
        return { value, state: type === 'compare' ? 'compare' as const : 'insert' as const };
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
   * Merge two sorted subarrays: arr[left..mid] and arr[mid+1..right]
   */
  function merge(left: number, mid: number, right: number) {
    // Create temporary arrays
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    addStep(
      'merge',
      `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`,
      arr,
      Array.from({ length: right - left + 1 }, (_, i) => left + i)
    );

    let i = 0; // Index for left subarray
    let j = 0; // Index for right subarray
    let k = left; // Index for merged array

    // Merge the two arrays
    while (i < leftArr.length && j < rightArr.length) {
      addStep(
        'compare',
        `Comparing ${leftArr[i]} (left) with ${rightArr[j]} (right)`,
        arr,
        [left + i, mid + 1 + j]
      );

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        addStep(
          'merge',
          `Placing ${leftArr[i]} at position ${k}`,
          arr,
          [k]
        );
        i++;
      } else {
        arr[k] = rightArr[j];
        addStep(
          'merge',
          `Placing ${rightArr[j]} at position ${k}`,
          arr,
          [k]
        );
        j++;
      }
      k++;
    }

    // Copy remaining elements from left array
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      addStep(
        'merge',
        `Placing remaining element ${leftArr[i]} from left subarray`,
        arr,
        [k]
      );
      i++;
      k++;
    }

    // Copy remaining elements from right array
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      addStep(
        'merge',
        `Placing remaining element ${rightArr[j]} from right subarray`,
        arr,
        [k]
      );
      j++;
      k++;
    }

    // Show merged result
    const mergedIndices = Array.from({ length: right - left + 1 }, (_, idx) => left + idx);
    addStep(
      'sorted',
      `Subarray [${left}..${right}] is now sorted`,
      arr,
      [],
      mergedIndices
    );
  }

  /**
   * Recursive merge sort function
   */
  function mergeSortRecursive(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      // Divide step
      stepNumber++;
      const divideArray: ArrayElement[] = arr.map((value, index) => {
        if (index >= left && index <= mid) {
          return { value, state: 'compare' as const };
        }
        if (index > mid && index <= right) {
          return { value, state: 'pivot' as const };
        }
        return { value, state: 'normal' as const };
      });

      steps.push({
        stepNumber,
        type: 'partition' as any,
        description: `Dividing array at index ${mid}: left[${left}..${mid}], right[${mid + 1}..${right}]`,
        array: divideArray,
      });

      // Recursively sort left half
      mergeSortRecursive(left, mid);
      
      // Recursively sort right half
      mergeSortRecursive(mid + 1, right);
      
      // Merge the sorted halves
      merge(left, mid, right);
    }
  }

  // Start the recursive sorting
  mergeSortRecursive(0, n - 1);

  // Final step
  stepNumber++;
  steps.push({
    stepNumber,
    type: 'sorted',
    description: 'Sorting complete! All elements are merged and sorted.',
    array: arr.map(value => ({ value, state: 'sorted' as const })),
  });

  return steps;
}
