/**
 * Sorting Algorithms Visualizer - Landing Page
 * 
 * Main entry point showcasing all available sorting algorithms
 * with educational information and links to individual visualizers.
 */

import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  BookOpen, 
  Code2, 
  Github,
  Layers,
  TrendingUp,
  Clock
} from 'lucide-react';

// Algorithm data with metadata
const algorithms = [
  {
    name: 'Bubble Sort',
    path: '/bubble-sort',
    description: 'Compare adjacent elements and swap if needed',
    complexity: 'O(n²)',
    type: 'Comparison',
    stable: true,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Selection Sort',
    path: '/selection-sort',
    description: 'Find minimum and place at beginning',
    complexity: 'O(n²)',
    type: 'Comparison',
    stable: false,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Insertion Sort',
    path: '/insertion-sort',
    description: 'Insert each element into its correct position',
    complexity: 'O(n²)',
    type: 'Comparison',
    stable: true,
    color: 'from-orange-500 to-yellow-500',
  },
  {
    name: 'Merge Sort',
    path: '/merge-sort',
    description: 'Divide, sort, and merge subarrays',
    complexity: 'O(n log n)',
    type: 'Divide & Conquer',
    stable: true,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Quick Sort',
    path: '/quick-sort',
    description: 'Partition around pivot recursively',
    complexity: 'O(n log n)',
    type: 'Divide & Conquer',
    stable: false,
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Heap Sort',
    path: '/heap-sort',
    description: 'Build heap and extract max repeatedly',
    complexity: 'O(n log n)',
    type: 'Selection',
    stable: false,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Counting Sort',
    path: '/counting-sort',
    description: 'Count occurrences and place elements',
    complexity: 'O(n + k)',
    type: 'Non-Comparison',
    stable: true,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Radix Sort',
    path: '/radix-sort',
    description: 'Sort by digits from least to most significant',
    complexity: 'O(d(n + k))',
    type: 'Non-Comparison',
    stable: true,
    color: 'from-rose-500 to-pink-500',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-border/50">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, hsl(280 87% 65% / 0.1) 0%, transparent 50%)`,
          }}
        />
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Educational DSA Tool</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-gradient">Sorting Algorithms</span>
              <br />
              <span className="text-foreground">Visualizer</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Interactive step-by-step visualization of classic sorting algorithms.
              Watch each comparison, swap, and merge as a permanent history.
              Perfect for learning, teaching, and interviews.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-card/50 border border-border/50">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm">8 Algorithms</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-card/50 border border-border/50">
                <Layers className="w-5 h-5 text-green-400" />
                <span className="text-sm">Step History</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-card/50 border border-border/50">
                <Code2 className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Clean Code</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Algorithms Grid */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose an Algorithm</h2>
              <p className="text-muted-foreground">
                Click on any algorithm to start visualizing
              </p>
            </div>
          </div>

          {/* Algorithm Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {algorithms.map((algo) => (
              <Link
                key={algo.path}
                to={algo.path}
                className="algo-card group"
              >
                {/* Gradient Accent */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${algo.color} rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity`}
                />

                {/* Content */}
                <div className="relative">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {algo.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {algo.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-mono text-primary">{algo.complexity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Type:</span>
                      <span className="text-foreground">{algo.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Layers className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Stable:</span>
                      <span className={algo.stable ? 'text-green-400' : 'text-red-400'}>
                        {algo.stable ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Built for learning Data Structures & Algorithms
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Perfect for teaching, interviews, and portfolios
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
