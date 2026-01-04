/**
 * StepHistory Component
 * 
 * Displays the complete history of sorting steps.
 * Each step is rendered as a separate row that persists,
 * creating a visual timeline of the sorting process.
 */

import { Step } from '@/utils/sortingHelpers';
import { ArrayVisualizer } from './ArrayVisualizer';

interface StepHistoryProps {
  steps: Step[];
}

export function StepHistory({ steps }: StepHistoryProps) {
  if (steps.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">Enter an array and click "Sort" to begin visualization</p>
        <p className="text-sm mt-2">Format: "5 2 8 9" or "5,2,8,9"</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div
          key={index}
          className="step-row"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Step Number */}
          <div className="text-muted-foreground font-mono text-sm w-12 shrink-0">
            #{step.stepNumber}
          </div>

          {/* Step Label */}
          <div className={`step-label ${step.type}`}>
            {step.type}
          </div>

          {/* Array Visualization */}
          <div className="flex-1">
            <ArrayVisualizer elements={step.array} />
          </div>

          {/* Step Description */}
          <div className="text-sm text-muted-foreground max-w-xs text-right hidden md:block">
            {step.description}
          </div>
        </div>
      ))}
    </div>
  );
}
