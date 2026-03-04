import type { Metadata } from 'next';
import StateCompareClient from './StateCompareClient';

export const metadata: Metadata = {
  title: 'Compare State Crime Rates — Side-by-Side State Comparison',
  description: 'Compare crime rates between any two US states. Side-by-side violent crime, murder, property crime comparison with 40+ years of FBI data.',
  alternates: { canonical: 'https://www.opencrime.us/tools/state-compare' },
};

export default function StateComparePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">Compare State Crime Rates</h1>
      <p className="text-gray-600 mb-6">Select two states to compare their crime statistics side by side</p>
      <StateCompareClient />
    </div>
  );
}
