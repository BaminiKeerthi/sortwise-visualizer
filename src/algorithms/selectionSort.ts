/**
 * Selection Sort Algorithm
 * 
 * Selection Sort divides the array into sorted and unsorted regions.
 * It repeatedly finds the minimum element from the unsorted region
 * and places it at the beginning of the unsorted region.
 * 
 * Time Complexity:
 * - Best: O(n²)
 * - Average: O(n²)
 * - Worst: O(n²)
 * 
 * Space Complexity: O(1) - in-place sorting
 * 
 * Characteristics:
 * - Not stable (may change relative order of equal elements)
 * - Simple implementation
 * - Minimum number of swaps: O(n)
 */

import { Step, createInitialStep, createStep, swap, copyArray } from '@/utils/sortingHelpers';

export function selectionSort(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const arr = copyArray(inputArray);
  const n = arr.length;
  let stepNumber = 0;

  // Step 0: Show initial array
  steps.push(createInitialStep(arr));

  // Track sorted elements
  const sortedIndices: number[] = [];

  // Outer loop: iterate through each position
  for (let i = 0; i < n - 1; i++) {
    // Find minimum element in unsorted portion
    let minIndex = i;

    // Inner loop: find the minimum element
    for (let j = i + 1; j < n; j++) {
      stepNumber++;

      // Step: Compare current minimum with next element
      steps.push(createStep(
        stepNumber,
        'compare',
        `Comparing current minimum arr[${minIndex}]=${arr[minIndex]} with arr[${j}]=${arr[j]}`,
        arr,
        [minIndex, j],
        'compare',
        sortedIndices
      ));

      // Update minimum if we found a smaller element
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        stepNumber++;

        // Show new minimum found
        steps.push(createStep(
          stepNumber,
          'compare',
          `New minimum found: ${arr[minIndex]} at index ${minIndex}`,
          arr,
          [minIndex],
          'pivot', // Using pivot color to highlight new minimum
          sortedIndices
        ));
      }
    }

    // Swap minimum element with first unsorted element (if different)
    if (minIndex !== i) {
      stepNumber++;
      
      steps.push(createStep(
        stepNumber,
        'swap',
        `Swapping minimum ${arr[minIndex]} with ${arr[i]}`,
        arr,
        [i, minIndex],
        'swap',
        sortedIndices
      ));

      swap(arr, i, minIndex);
    }

    // Mark this position as sorted
    sortedIndices.push(i);
    stepNumber++;

    steps.push(createStep(
      stepNumber,
      'sorted',
      `Element ${arr[i]} is now in its correct position at index ${i}`,
      arr,
      [],
      'normal',
      sortedIndices
    ));
  }

  // Last element is automatically sorted
  sortedIndices.push(n - 1);
  stepNumber++;

  steps.push(createStep(
    stepNumber,
    'sorted',
    'Sorting complete! All elements are in their correct positions.',
    arr,
    [],
    'normal',
    sortedIndices
  ));

  return steps;
}
