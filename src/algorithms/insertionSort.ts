/**
 * Insertion Sort Algorithm
 * 
 * Insertion Sort builds the final sorted array one element at a time.
 * It picks each element and inserts it into its correct position
 * among the previously sorted elements.
 * 
 * Time Complexity:
 * - Best: O(n) when array is already sorted
 * - Average: O(n²)
 * - Worst: O(n²) when array is reverse sorted
 * 
 * Space Complexity: O(1) - in-place sorting
 * 
 * Characteristics:
 * - Stable sort
 * - Adaptive (efficient for nearly sorted data)
 * - Online (can sort as it receives data)
 * - Efficient for small datasets
 */

import { Step, createInitialStep, createStep, copyArray, ArrayElement } from '@/utils/sortingHelpers';

export function insertionSort(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const arr = copyArray(inputArray);
  const n = arr.length;
  let stepNumber = 0;

  // Step 0: Show initial array
  steps.push(createInitialStep(arr));

  // First element is considered sorted
  const sortedIndices: number[] = [0];
  stepNumber++;
  
  steps.push(createStep(
    stepNumber,
    'sorted',
    `First element ${arr[0]} is considered sorted`,
    arr,
    [],
    'normal',
    sortedIndices
  ));

  // Start from second element
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    stepNumber++;

    // Show the element we're about to insert
    steps.push(createStep(
      stepNumber,
      'insert',
      `Picking element ${key} to insert into sorted portion`,
      arr,
      [i],
      'insert',
      sortedIndices
    ));

    // Compare with elements in sorted portion
    while (j >= 0 && arr[j] > key) {
      stepNumber++;

      // Compare step
      steps.push(createStep(
        stepNumber,
        'compare',
        `Comparing ${key} with arr[${j}]=${arr[j]}`,
        arr,
        [j, j + 1],
        'compare',
        sortedIndices.filter(idx => idx !== j + 1)
      ));

      // Shift element to the right
      arr[j + 1] = arr[j];
      stepNumber++;

      // Create custom array state for shift visualization
      const shiftArray: ArrayElement[] = arr.map((value, index) => {
        if (index === j) {
          return { value, state: 'swap' as const };
        }
        if (index === j + 1) {
          return { value, state: 'swap' as const };
        }
        if (sortedIndices.includes(index) && index !== j + 1) {
          return { value, state: 'sorted' as const };
        }
        return { value, state: 'normal' as const };
      });

      steps.push({
        stepNumber,
        type: 'swap',
        description: `Shifting ${arr[j]} to position ${j + 1}`,
        array: shiftArray,
      });

      j--;
    }

    // Insert key at correct position
    arr[j + 1] = key;
    
    // Update sorted indices - all elements from 0 to i are now sorted
    sortedIndices.length = 0;
    for (let k = 0; k <= i; k++) {
      sortedIndices.push(k);
    }

    stepNumber++;

    steps.push(createStep(
      stepNumber,
      'insert',
      `Inserted ${key} at position ${j + 1}`,
      arr,
      [j + 1],
      'insert',
      sortedIndices
    ));

    // Show sorted state after insertion
    stepNumber++;

    steps.push(createStep(
      stepNumber,
      'sorted',
      `Elements 0 to ${i} are now sorted`,
      arr,
      [],
      'normal',
      sortedIndices
    ));
  }

  // Final step
  stepNumber++;
  steps.push(createStep(
    stepNumber,
    'sorted',
    'Sorting complete! All elements are in their correct positions.',
    arr,
    [],
    'normal',
    Array.from({ length: n }, (_, i) => i)
  ));

  return steps;
}
