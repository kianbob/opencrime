'use client';
import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

type Point = { state: string; x: number; y: number };
type Correlation = {
  xLabel: string; yLabel: string; r: number; rSquared: number;
  interpretation: string; points: Point[];
};

function CorrelationTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: Point }> }) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border rounded-lg shadow-lg px-3 py-2 text-sm">
      <div className="font-bold">{d.state}</div>
      <div>X: {d.x} · Y: {d.y.toFixed(1)}</div>
    </div>
  );
}

export default function CorrelationCharts({ correlations }: { correlations: Correlation[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {correlations.map((c, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h3 className="font-heading text-lg font-bold">{c.xLabel} vs {c.yLabel}</h3>
            <div className="flex gap-4 text-sm mt-2 md:mt-0">
              <span className="bg-gray-100 px-3 py-1 rounded-full">r = {c.r.toFixed(3)}</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">r² = {c.rSquared.toFixed(3)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{c.interpretation}</p>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name={c.xLabel} type="number" label={{ value: c.xLabel, position: 'bottom', offset: -5 }} />
              <YAxis dataKey="y" name={c.yLabel} type="number" label={{ value: c.yLabel, angle: -90, position: 'insideLeft' }} />
              <ZAxis range={[60, 60]} />
              <Tooltip content={<CorrelationTooltip />} />
              <Scatter
                data={c.points}
                fill="#1e3a5f"
                onClick={(d: Point) => setSelected(d?.state === selected ? null : d?.state)}
              />
            </ScatterChart>
          </ResponsiveContainer>
          {selected && c.points.find(p => p.state === selected) && (
            <div className="mt-3 text-sm bg-blue-50 rounded-lg px-4 py-2">
              <strong>{selected}</strong>: {c.xLabel} = {c.points.find(p => p.state === selected)!.x}, {c.yLabel} = {c.points.find(p => p.state === selected)!.y.toFixed(1)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
