import type { Metadata } from 'next';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Compare City Crime Rates — Side-by-Side Comparison Tool',
  description: 'Compare crime rates between any two US cities. Side-by-side violent crime, murder, property crime comparison with FBI data.',
};

export default function ComparePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">Compare City Crime Rates</h1>
      <p className="text-gray-600 mb-6">Select two cities to compare their crime statistics side by side</p>
      <CompareClient />
    </div>
  );
}
