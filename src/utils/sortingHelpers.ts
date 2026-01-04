/**
 * Sorting Algorithm Visualizer - Helper Functions
 * 
 * This module provides utility functions for:
 * - Parsing user input (both space and comma separated)
 * - Generating visualization steps
 * - Managing array state for animations
 */

// Types for visualization steps
export type StepType = 
  | 'initial' 
  | 'compare' 
  | 'swap' 
  | 'sorted' 
  | 'merge' 
  | 'insert' 
  | 'partition'
  | 'count'
  | 'place';

export type ElementState = 
  | 'normal' 
  | 'compare' 
  | 'swap' 
  | 'sorted' 
  | 'pivot' 
  | 'insert';

export interface ArrayElement {
  value: number;
  state: ElementState;
}

export interface Step {
  stepNumber: number;
  type: StepType;
  description: string;
  array: ArrayElement[];
  highlightIndices?: number[];
}

/**
 * Parses user input string into an array of numbers
 * Accepts both space-separated (5 2 8 9) and comma-separated (5,2,8,9) formats
 * 
 * @param input - Raw user input string
 * @returns Array of numbers or null if invalid
 */
export function parseInput(input: string): number[] | null {
  // Trim whitespace
  const trimmed = input.trim();
  
  if (!trimmed) {
    return null;
  }

  // Determine separator: comma or space
  let parts: string[];
  
  if (trimmed.includes(',')) {
    // Comma-separated format: "5,2,8,9" or "5, 2, 8, 9"
    parts = trimmed.split(',').map(s => s.trim());
  } else {
    // Space-separated format: "5 2 8 9"
    parts = trimmed.split(/\s+/);
  }

  // Parse each part to a number
  const numbers: number[] = [];
  
  for (const part of parts) {
    if (part === '') continue;
    
    const num = Number(part);
    
    // Validate: must be a finite number
    if (!Number.isFinite(num)) {
      return null;
    }
    
    numbers.push(num);
  }

  // Must have at least 2 elements to sort
  if (numbers.length < 2) {
    return null;
  }

  return numbers;
}

/**
 * Creates the initial step with all elements in normal state
 * 
 * @param arr - The input array
 * @returns Initial Step object
 */
export function createInitialStep(arr: number[]): Step {
  return {
    stepNumber: 0,
    type: 'initial',
    description: 'Initial array',
    array: arr.map(value => ({ value, state: 'normal' as ElementState })),
  };
}

/**
 * Creates a new step for visualization
 * 
 * @param stepNumber - The step number
 * @param type - Type of operation (compare, swap, etc.)
 * @param description - Human-readable description
 * @param arr - Current array values
 * @param highlightIndices - Indices to highlight
 * @param highlightState - State to apply to highlighted elements
 * @param sortedIndices - Indices of sorted elements
 */
export function createStep(
  stepNumber: number,
  type: StepType,
  description: string,
  arr: number[],
  highlightIndices: number[] = [],
  highlightState: ElementState = 'normal',
  sortedIndices: number[] = []
): Step {
  const array: ArrayElement[] = arr.map((value, index) => {
    if (sortedIndices.includes(index)) {
      return { value, state: 'sorted' as ElementState };
    }
    if (highlightIndices.includes(index)) {
      return { value, state: highlightState };
    }
    return { value, state: 'normal' as ElementState };
  });

  return {
    stepNumber,
    type,
    description,
    array,
    highlightIndices,
  };
}

/**
 * Swaps two elements in an array (mutates the array)
 * 
 * @param arr - The array to modify
 * @param i - First index
 * @param j - Second index
 */
export function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * Creates a deep copy of an array
 */
export function copyArray(arr: number[]): number[] {
  return [...arr];
}
