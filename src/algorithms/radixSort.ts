/**
 * Radix Sort Algorithm
 * 
 * Radix Sort processes digits from least significant to most significant,
 * using a stable sort (counting sort) at each digit position.
 * 
 * Time Complexity:
 * - Best: O(d × (n + k)) where d is digits and k is base
 * - Average: O(d × (n + k))
 * - Worst: O(d × (n + k))
 * 
 * Space Complexity: O(n + k) for counting sort
 * 
 * Characteristics:
 * - Stable sort
 * - Not in-place
 * - Only works with non-negative integers
 * - Efficient for integers with fixed number of digits
 */

import { Step, createInitialStep, copyArray, ArrayElement } from '@/utils/sortingHelpers';

export function radixSort(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  let arr = copyArray(inputArray);
  const n = arr.length;
  let stepNumber = 0;

  // Handle negative numbers by finding minimum
  const min = Math.min(...arr);
  if (min < 0) {
    // Shift all numbers to make them non-negative
    arr = arr.map(x => x - min);
  }

  // Step 0: Show initial array
  steps.push(createInitialStep(inputArray));

  // Find maximum to determine number of digits
  const max = Math.max(...arr);
  const numDigits = max === 0 ? 1 : Math.floor(Math.log10(max)) + 1;

  stepNumber++;
  steps.push({
    stepNumber,
    type: 'partition' as any,
    description: `Maximum value: ${max}, Number of digits to process: ${numDigits}`,
    array: arr.map(value => ({ value: min < 0 ? value + min : value, state: 'normal' as const })),
  });

  /**
   * Get digit at specified position (0 = least significant)
   */
  function getDigit(num: number, position: number): number {
    return Math.floor(num / Math.pow(10, position)) % 10;
  }

  /**
   * Counting sort based on digit at specified position
   */
  function countingSortByDigit(position: number) {
    const output: number[] = new Array(n);
    const count: number[] = new Array(10).fill(0);
    const digitExp = Math.pow(10, position);

    stepNumber++;
    steps.push({
      stepNumber,
      type: 'partition' as any,
      description: `Processing digit at position ${position} (${position === 0 ? 'ones' : position === 1 ? 'tens' : position === 2 ? 'hundreds' : 'thousands'} place)`,
      array: arr.map(value => ({ value: min < 0 ? value + min : value, state: 'normal' as const })),
    });

    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
      const digit = getDigit(arr[i], position);
      count[digit]++;

      stepNumber++;
      const displayValue = min < 0 ? arr[i] + min : arr[i];
      steps.push({
        stepNumber,
        type: 'count' as any,
        description: `Element ${displayValue}: digit at position ${position} is ${digit}`,
        array: arr.map((value, idx) => ({
          value: min < 0 ? value + min : value,
          state: idx === i ? 'compare' as const : 'normal' as const,
        })),
        highlightIndices: [i],
      });
    }

    // Cumulative count
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build output array (right to left for stability)
    stepNumber++;
    steps.push({
      stepNumber,
      type: 'partition' as any,
      description: 'Placing elements based on their digit',
      array: arr.map(value => ({ value: min < 0 ? value + min : value, state: 'normal' as const })),
    });

    const placed = new Set<number>();

    for (let i = n - 1; i >= 0; i--) {
      const digit = getDigit(arr[i], position);
      const position_idx = count[digit] - 1;
      output[position_idx] = arr[i];
      count[digit]--;
      placed.add(position_idx);

      stepNumber++;
      
      const displayValue = min < 0 ? arr[i] + min : arr[i];
      const array: ArrayElement[] = output.map((val, idx) => {
        if (val === undefined) {
          return { value: 0, state: 'normal' as const };
        }
        const display = min < 0 ? val + min : val;
        if (idx === position_idx) {
          return { value: display, state: 'insert' as const };
        }
        if (placed.has(idx)) {
          return { value: display, state: 'sorted' as const };
        }
        return { value: display, state: 'normal' as const };
      });

      steps.push({
        stepNumber,
        type: 'insert' as any,
        description: `Placing ${displayValue} at position ${position_idx} (digit ${digit})`,
        array: array.filter(el => el.value !== 0 || placed.size === n),
        highlightIndices: [position_idx],
      });
    }

    // Copy output to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }

    // Show result after this digit pass
    stepNumber++;
    steps.push({
      stepNumber,
      type: 'sorted' as any,
      description: `Array after sorting by position ${position}`,
      array: arr.map(value => ({ 
        value: min < 0 ? value + min : value, 
        state: 'insert' as const 
      })),
    });
  }

  // Process each digit position
  for (let position = 0; position < numDigits; position++) {
    countingSortByDigit(position);
  }

  // Shift back if we had negative numbers
  if (min < 0) {
    arr = arr.map(x => x + min);
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
