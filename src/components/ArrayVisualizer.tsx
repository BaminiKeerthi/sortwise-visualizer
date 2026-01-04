/**
 * ArrayVisualizer Component
 * 
 * Renders a single row of array boxes representing one step in the sorting process.
 * Each box can have different states: normal, compare, swap, sorted, pivot, insert
 */

import { ArrayElement } from '@/utils/sortingHelpers';

interface ArrayVisualizerProps {
  elements: ArrayElement[];
}

export function ArrayVisualizer({ elements }: ArrayVisualizerProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {elements.map((element, index) => (
        <div
          key={index}
          className={`array-box ${element.state}`}
          title={`Index: ${index}, Value: ${element.value}`}
        >
          {element.value}
        </div>
      ))}
    </div>
  );
}
