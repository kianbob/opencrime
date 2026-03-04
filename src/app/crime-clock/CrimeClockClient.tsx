'use client';
import { useState, useEffect } from 'react';

const CRIME_CONFIG = [
  { key: 'violentCrime', label: 'Violent Crime', color: '#dc2626', icon: '⚡' },
  { key: 'murder', label: 'Murder', color: '#991b1b', icon: '💀' },
  { key: 'rape', label: 'Rape', color: '#9333ea', icon: '⚠️' },
  { key: 'robbery', label: 'Robbery', color: '#ea580c', icon: '🔫' },
  { key: 'assault', label: 'Aggravated Assault', color: '#dc2626', icon: '👊' },
  { key: 'propertyCrime', label: 'Property Crime', color: '#1e3a5f', icon: '🏠' },
  { key: 'burglary', label: 'Burglary', color: '#0369a1', icon: '🚪' },
  { key: 'larceny', label: 'Larceny-Theft', color: '#0891b2', icon: '💰' },
  { key: 'motorVehicleTheft', label: 'Motor Vehicle Theft', color: '#4338ca', icon: '🚗' },
];

function fmtTime(seconds: number): string {
  if (seconds < 60) return `${seconds} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  return `${(seconds / 3600).toFixed(1)} hours`;
}

export default function CrimeClockClient({ crimeClock }: { crimeClock: Record<string, number> }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      {/* Live counter header */}
      <div className="bg-gray-900 text-white rounded-xl p-6 text-center">
        <p className="text-sm text-gray-400 mb-1">Time on this page</p>
        <p className="text-4xl font-mono font-bold tabular-nums">
          {String(Math.floor(elapsed / 3600)).padStart(2, '0')}:
          {String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')}:
          {String(elapsed % 60).padStart(2, '0')}
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-2xl font-bold text-red-400 tabular-nums">{Math.floor(elapsed / crimeClock.violentCrime)}</p>
            <p className="text-gray-400">Violent Crimes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-400 tabular-nums">{Math.floor(elapsed / crimeClock.propertyCrime)}</p>
            <p className="text-gray-400">Property Crimes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-400 tabular-nums">{Math.floor(elapsed / crimeClock.motorVehicleTheft)}</p>
            <p className="text-gray-400">Cars Stolen</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400 tabular-nums">{(elapsed / crimeClock.murder).toFixed(2)}</p>
            <p className="text-gray-400">Murders</p>
          </div>
        </div>
      </div>

      {/* Crime frequency cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CRIME_CONFIG.map(({ key, label, color, icon }) => {
          const sec = crimeClock[key];
          if (!sec) return null;
          const perDay = Math.round(86400 / sec);
          const progress = Math.min((elapsed % sec) / sec * 100, 100);
          return (
            <div key={key} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-semibold text-gray-900">{label}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-1">One every</p>
              <p className="text-2xl font-bold" style={{ color }}>{fmtTime(sec)}</p>
              <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${progress}%`, backgroundColor: color }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">{perDay.toLocaleString()} per day · {Math.floor(elapsed / sec)} since you arrived</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
