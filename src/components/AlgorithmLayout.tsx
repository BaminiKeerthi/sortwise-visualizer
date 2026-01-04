/**
 * AlgorithmLayout Component
 * 
 * Shared layout wrapper for all sorting algorithm pages.
 * Provides consistent structure with header, input, and visualization area.
 */

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface AlgorithmLayoutProps {
  title: string;
  description: string;
  complexity: {
    time: { best: string; average: string; worst: string };
    space: string;
  };
  children: ReactNode;
}

export function AlgorithmLayout({ 
  title, 
  description, 
  complexity,
  children 
}: AlgorithmLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold text-gradient">{title}</h1>
            </div>
            
            <Link 
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">All Algorithms</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Algorithm Info */}
        <div className="mb-8 p-6 rounded-2xl bg-card/50 border border-border/50">
          <p className="text-muted-foreground mb-4">{description}</p>
          
          {/* Complexity Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 rounded-xl bg-secondary/50">
              <div className="text-muted-foreground mb-1">Best Case</div>
              <div className="font-mono text-green-400">{complexity.time.best}</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50">
              <div className="text-muted-foreground mb-1">Average</div>
              <div className="font-mono text-yellow-400">{complexity.time.average}</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50">
              <div className="text-muted-foreground mb-1">Worst Case</div>
              <div className="font-mono text-red-400">{complexity.time.worst}</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50">
              <div className="text-muted-foreground mb-1">Space</div>
              <div className="font-mono text-primary">{complexity.space}</div>
            </div>
          </div>
        </div>

        {/* Visualization Area */}
        {children}
      </main>
    </div>
  );
}
