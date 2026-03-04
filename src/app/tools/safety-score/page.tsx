import type { Metadata } from 'next';
import SafetyScoreClient from './SafetyScoreClient';

export const metadata: Metadata = {
  title: 'City Safety Score Calculator — How Safe Is Your City?',
  description: 'Find out how safe your city is compared to the national average. Get a safety grade (A-F) based on FBI crime data for any US city.',
};

export default function SafetyScorePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">City Safety Score</h1>
      <p className="text-gray-600 mb-6">Search any city to see its safety grade based on FBI crime data</p>
      <SafetyScoreClient />
    </div>
  );
}
