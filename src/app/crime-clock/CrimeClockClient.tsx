'use client';
import { useState, useEffect } from 'react';

export default function CrimeClockClient({ crimeClock }: { crimeClock: Record<string, number> }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const crimes = [
    { label: 'Property Crimes', seconds: crimeClock.propertyCrime, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Larceny-Thefts', seconds: crimeClock.larceny, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Violent Crimes', seconds: crimeClock.violentCrime, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Assaults', seconds: crimeClock.assault, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Robberies', seconds: crimeClock.robbery, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Murders', seconds: crimeClock.murder, color: 'text-red-800', bg: 'bg-red-100' },
  ];

  return (
    <div className="mb-8">
      <div className="text-center mb-4">
        <div className="text-sm text-gray-500">Time on this page</div>
        <div className="text-4xl font-mono font-bold text-[#1e3a5f]">
          {Math.floor(elapsed / 60).toString().padStart(2, '0')}:{(elapsed % 60).toString().padStart(2, '0')}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {crimes.map(c => {
          const count = Math.floor(elapsed / c.seconds);
          return (
            <div key={c.label} className={`${c.bg} rounded-xl p-4 text-center transition-all`}>
              <div className={`text-4xl font-bold font-mono ${c.color}`}>{count}</div>
              <div className="text-sm text-gray-600 mt-1">{c.label}</div>
              <div className="text-xs text-gray-400">since you opened this page</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
