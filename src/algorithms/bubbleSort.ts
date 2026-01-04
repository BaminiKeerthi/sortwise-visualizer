/**
 * Bubble Sort Algorithm
 * 
 * Bubble Sort repeatedly steps through the list, compares adjacent elements,
 * and swaps them if they are in the wrong order. The pass through the list
 * is repeated until the list is sorted.
 * 
 * Time Complexity:
 * - Best: O(n) when array is already sorted
 * - Average: O(n²)
 * - Worst: O(n²)
 * 
 * Space Complexity: O(1) - in-place sorting
 * 
 * Characteristics:
 * - Stable sort (maintains relative order of equal elements)
 * - Adaptive (can detect sorted array)
 * - Simple implementation
 */

import { Step, createInitialStep, createStep, swap, copyArray } from '@/utils/sortingHelpers';

export function bubbleSort(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const arr = copyArray(inputArray);
  const n = arr.length;
  let stepNumber = 0;

  // Step 0: Show initial array
  steps.push(createInitialStep(arr));

  // Track sorted elements (elements at the end are sorted after each pass)
  const sortedIndices: number[] = [];

  // Outer loop: number of passes
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Inner loop: compare adjacent elements
    // After each pass, the largest unsorted element bubbles to its correct position
    for (let j = 0; j < n - i - 1; j++) {
      stepNumber++;

      // Step: Compare adjacent elements
      steps.push(createStep(
        stepNumber,
        'compare',
        `Comparing arr[${j}]=${arr[j]} with arr[${j + 1}]=${arr[j + 1]}`,
        arr,
        [j, j + 1],
        'compare',
        sortedIndices
      ));

      // If left element is greater than right, swap them
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swapped = true;
        stepNumber++;

        // Step: Show the swap
        steps.push(createStep(
          stepNumber,
          'swap',
          `Swapped ${arr[j + 1]} and ${arr[j]} (${arr[j + 1]} > ${arr[j]})`,
          arr,
          [j, j + 1],
          'swap',
          sortedIndices
        ));
      }
    }

    // After this pass, element at position (n - i - 1) is in its final position
    sortedIndices.push(n - i - 1);
    stepNumber++;

    steps.push(createStep(
      stepNumber,
      'sorted',
      `Element ${arr[n - i - 1]} is now in its correct position`,
      arr,
      [],
      'normal',
      sortedIndices
    ));

    // Optimization: If no swaps occurred, array is already sorted
    if (!swapped) {
      // Mark remaining elements as sorted
      for (let k = 0; k < n - i - 1; k++) {
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
      }
      
      stepNumber++;
      steps.push(createStep(
        stepNumber,
        'sorted',
        'No swaps in this pass - Array is sorted!',
        arr,
        [],
        'normal',
        sortedIndices
      ));
      break;
    }
  }

  // Final sorted step if not already marked
  if (sortedIndices.length < n) {
    sortedIndices.push(0); // First element is also sorted
    stepNumber++;
    steps.push(createStep(
      stepNumber,
      'sorted',
      'Sorting complete!',
      arr,
      [],
      'normal',
      Array.from({ length: n }, (_, i) => i)
    ));
  }

  return steps;
}
