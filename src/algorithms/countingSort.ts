/**
 * Counting Sort Algorithm
 * 
 * Counting Sort is a non-comparison sorting algorithm that counts
 * the occurrences of each unique element and uses this information
 * to place elements in their correct sorted positions.
 * 
 * Time Complexity:
 * - Best: O(n + k) where k is the range of input
 * - Average: O(n + k)
 * - Worst: O(n + k)
 * 
 * Space Complexity: O(n + k) for count array and output array
 * 
 * Characteristics:
 * - Stable sort
 * - Not in-place
 * - Only works with non-negative integers
 * - Efficient when k is not significantly larger than n
 */

import { Step, createInitialStep, copyArray, ArrayElement } from '@/utils/sortingHelpers';

export function countingSort(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const arr = copyArray(inputArray);
  const n = arr.length;
  let stepNumber = 0;

  // Step 0: Show initial array
  steps.push(createInitialStep(arr));

  // Find the maximum and minimum values
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  stepNumber++;
  steps.push({
    stepNumber,
    type: 'partition' as any,
    description: `Range analysis: min=${min}, max=${max}, range=${range}`,
    array: arr.map(value => ({ value, state: 'normal' as const })),
  });

  // Create count array and initialize with zeros
  const count: number[] = new Array(range).fill(0);

  // Count occurrences of each element
  stepNumber++;
  steps.push({
    stepNumber,
    type: 'count' as any,
    description: 'Phase 1: Counting occurrences of each element',
    array: arr.map(value => ({ value, state: 'normal' as const })),
  });

  for (let i = 0; i < n; i++) {
    const index = arr[i] - min;
    count[index]++;

    stepNumber++;
    steps.push({
      stepNumber,
      type: 'count' as any,
      description: `Counting element ${arr[i]}: count[${arr[i]}] = ${count[index]}`,
      array: arr.map((value, idx) => ({
        value,
        state: idx === i ? 'compare' as const : 'normal' as const,
      })),
      highlightIndices: [i],
    });
  }

  // Modify count array to store cumulative counts
  stepNumber++;
  steps.push({
    stepNumber,
    type: 'partition' as any,
    description: 'Phase 2: Computing cumulative counts for positions',
    array: arr.map(value => ({ value, state: 'normal' as const })),
  });

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  const output: number[] = new Array(n);
  const placed = new Set<number>();

  stepNumber++;
  steps.push({
    stepNumber,
    type: 'partition' as any,
    description: 'Phase 3: Placing elements in sorted positions',
    array: arr.map(value => ({ value, state: 'normal' as const })),
  });

  // Place elements in sorted order (iterate from end for stability)
  for (let i = n - 1; i >= 0; i--) {
    const value = arr[i];
    const index = value - min;
    const position = count[index] - 1;
    
    output[position] = value;
    count[index]--;
    placed.add(position);

    stepNumber++;
    
    // Show the placement step
    const array: ArrayElement[] = output.map((val, idx) => {
      if (idx === position) {
        return { value: val ?? 0, state: 'insert' as const };
      }
      if (placed.has(idx) && idx !== position) {
        return { value: val ?? 0, state: 'sorted' as const };
      }
      return { value: val ?? 0, state: 'normal' as const };
    });

    // Fill undefined positions with placeholder
    for (let j = 0; j < n; j++) {
      if (output[j] === undefined) {
        array[j] = { value: 0, state: 'normal' as const };
      }
    }

    steps.push({
      stepNumber,
      type: 'insert' as any,
      description: `Placing ${value} at position ${position}`,
      array: array.filter(el => el.value !== 0 || placed.has(array.indexOf(el))),
      highlightIndices: [position],
    });
  }

  // Copy output back to original array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }

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
