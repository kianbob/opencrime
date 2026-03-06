'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

type StateData = {
  abbr: string; name: string; population: number;
  violentRate: number; homicideRate: number; propertyRate: number;
  violentChange: number; violentCrime: number; homicide: number;
  propertyCrime: number;
};

type Metric = 'violentRate' | 'homicideRate' | 'propertyRate';

// US state SVG paths (simplified from public domain US map)
// Using Albers USA projection coordinates
const STATE_PATHS: Record<string, string> = {
  AL: "M628,466 L628,520 L620,536 L632,548 L632,560 L616,560 L612,468 Z",
  AK: "M161,485 L183,485 L183,510 L206,510 L206,530 L183,530 L183,545 L150,545 L138,530 L138,510 Z",
  AZ: "M205,410 L270,410 L282,490 L240,510 L198,510 L198,440 Z",
  AR: "M555,450 L610,448 L612,468 L612,508 L555,510 Z",
  CA: "M110,280 L160,270 L190,340 L195,410 L195,460 L155,475 L120,420 L100,350 Z",
  CO: "M285,320 L370,320 L370,390 L285,390 Z",
  CT: "M830,230 L858,222 L865,245 L838,252 Z",
  DE: "M790,310 L804,305 L808,330 L795,340 Z",
  FL: "M640,530 L700,510 L735,530 L730,570 L700,605 L670,595 L650,560 L632,560 L632,548 Z",
  GA: "M648,448 L700,448 L710,510 L700,510 L640,530 L632,548 L632,520 L628,466 Z",
  HI: "M260,545 L300,535 L310,548 L280,560 Z",
  ID: "M210,170 L255,165 L260,230 L245,280 L210,280 Z",
  IL: "M580,270 L610,270 L615,310 L622,370 L610,400 L580,410 L565,370 L568,310 Z",
  IN: "M618,275 L650,272 L655,350 L648,385 L620,395 L615,310 Z",
  IA: "M500,260 L575,258 L580,270 L568,310 L565,325 L500,328 Z",
  KS: "M390,365 L495,362 L495,420 L390,422 Z",
  KY: "M618,380 L710,365 L720,390 L680,410 L630,415 L612,405 Z",
  LA: "M555,510 L612,508 L616,560 L605,575 L560,570 L548,540 Z",
  ME: "M855,120 L875,110 L885,150 L870,195 L848,185 Z",
  MD: "M740,310 L790,300 L800,330 L790,340 L760,340 L740,325 Z",
  MA: "M835,210 L870,200 L878,215 L845,225 Z",
  MI: "M600,170 L640,160 L660,210 L645,260 L618,260 L610,220 Z M580,195 L600,170 L600,220 L580,230 Z",
  MN: "M480,130 L545,128 L550,210 L540,250 L500,255 L480,210 Z",
  MS: "M590,460 L628,460 L628,540 L616,560 L590,555 Z",
  MO: "M520,340 L580,335 L595,400 L580,430 L555,450 L510,445 L495,420 L495,362 L520,360 Z",
  MT: "M240,120 L355,115 L360,185 L240,190 Z",
  NE: "M370,280 L490,275 L495,330 L390,335 L370,320 Z",
  NV: "M165,260 L210,250 L225,380 L195,410 L155,380 Z",
  NH: "M845,155 L860,148 L865,195 L848,200 Z",
  NJ: "M795,265 L815,258 L818,300 L800,320 L790,310 Z",
  NM: "M270,410 L358,405 L365,495 L270,500 Z",
  NY: "M745,175 L830,165 L840,210 L810,250 L780,260 L750,240 Z",
  NC: "M670,390 L770,370 L790,395 L735,420 L680,420 Z",
  ND: "M370,130 L475,128 L480,195 L370,198 Z",
  OH: "M650,265 L700,258 L710,310 L710,365 L680,360 L655,350 Z",
  OK: "M385,420 L495,418 L495,455 L555,450 L555,470 L440,472 L385,470 Z",
  OR: "M110,170 L205,160 L210,230 L170,240 L110,240 Z",
  PA: "M710,250 L790,240 L795,280 L790,310 L740,310 L710,305 Z",
  RI: "M855,230 L868,225 L870,240 L858,245 Z",
  SC: "M680,420 L735,420 L740,450 L710,465 L680,450 Z",
  SD: "M370,198 L480,195 L485,265 L370,268 Z",
  TN: "M610,400 L720,388 L725,420 L612,435 Z",
  TX: "M360,440 L440,472 L555,470 L555,510 L548,540 L520,580 L470,610 L410,590 L370,540 L350,490 Z",
  UT: "M235,280 L285,275 L285,370 L240,380 L225,380 Z",
  VT: "M830,155 L845,148 L850,195 L835,200 Z",
  VA: "M700,340 L790,330 L790,395 L770,380 L720,388 L700,370 Z",
  WA: "M120,100 L210,95 L215,170 L125,175 Z",
  WV: "M700,310 L740,300 L745,340 L720,370 L700,360 L695,330 Z",
  WI: "M540,150 L590,148 L600,180 L595,245 L550,250 L540,210 Z",
  WY: "M270,200 L360,195 L365,275 L270,280 Z",
};

function getColor(value: number, min: number, max: number): string {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  // Navy to red gradient
  const r = Math.round(30 + t * 190);
  const g = Math.round(58 - t * 20);
  const b = Math.round(95 - t * 57);
  return `rgb(${r},${g},${b})`;
}

function fmtNum(n: number): string { return n.toLocaleString(); }
function fmtRate(n: number): string { return n.toFixed(1); }

const METRICS: { key: Metric; label: string; unit: string }[] = [
  { key: 'violentRate', label: 'Violent Crime Rate', unit: 'per 100K' },
  { key: 'homicideRate', label: 'Murder Rate', unit: 'per 100K' },
  { key: 'propertyRate', label: 'Property Crime Rate', unit: 'per 100K' },
];

export default function CrimeMapClient({ states }: { states: StateData[] }) {
  const [metric, setMetric] = useState<Metric>('violentRate');
  const [hovered, setHovered] = useState<StateData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const stateMap = useMemo(() => {
    const m: Record<string, StateData> = {};
    states.forEach(s => { m[s.abbr] = s; });
    return m;
  }, [states]);

  const { min, max } = useMemo(() => {
    const vals = states.map(s => s[metric]);
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [states, metric]);

  const sorted = useMemo(() =>
    [...states].sort((a, b) => b[metric] - a[metric]),
    [states, metric]
  );

  const metricInfo = METRICS.find(m => m.key === metric)!;

  return (
    <div>
      {/* Metric selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {METRICS.map(m => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              metric === m.key
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Map + tooltip */}
      <div className="relative bg-gray-50 rounded-2xl border p-4 mb-8">
        <svg
          viewBox="80 80 830 550"
          className="w-full h-auto"
          onMouseLeave={() => setHovered(null)}
        >
          {Object.entries(STATE_PATHS).map(([abbr, path]) => {
            const st = stateMap[abbr];
            if (!st) return null;
            const val = st[metric];
            const fill = getColor(val, min, max);
            return (
              <Link key={abbr} href={`/states/${abbr.toLowerCase()}`}>
                <path
                  d={path}
                  fill={fill}
                  stroke="white"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={(e) => {
                    setHovered(st);
                    const rect = (e.target as SVGElement).ownerSVGElement?.getBoundingClientRect();
                    if (rect) {
                      setTooltipPos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top - 10,
                      });
                    }
                  }}
                  onMouseMove={(e) => {
                    const rect = (e.target as SVGElement).ownerSVGElement?.getBoundingClientRect();
                    if (rect) {
                      setTooltipPos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top - 10,
                      });
                    }
                  }}
                />
              </Link>
            );
          })}
          {/* State labels */}
          {Object.entries(STATE_PATHS).map(([abbr]) => {
            const st = stateMap[abbr];
            if (!st) return null;
            // Calculate centroid from path (rough)
            const path = STATE_PATHS[abbr];
            const nums = path.match(/[\d.]+/g)?.map(Number) || [];
            let cx = 0, cy = 0, count = 0;
            for (let i = 0; i < nums.length - 1; i += 2) {
              cx += nums[i]; cy += nums[i + 1]; count++;
            }
            if (count === 0) return null;
            cx /= count; cy /= count;
            return (
              <text
                key={`label-${abbr}`}
                x={cx} y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none"
                fontSize="10"
                fontWeight="bold"
                fill="white"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="0.3"
              >
                {abbr}
              </text>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div
            className="absolute bg-white rounded-xl shadow-lg border p-3 pointer-events-none z-10 text-sm"
            style={{
              left: Math.min(tooltipPos.x, 600),
              top: tooltipPos.y - 100,
              minWidth: 200,
            }}
          >
            <p className="font-bold text-[#1e3a5f]">{hovered.name}</p>
            <p className="text-lg font-bold">{fmtRate(hovered[metric])} <span className="text-xs text-gray-500">{metricInfo.unit}</span></p>
            <div className="text-xs text-gray-500 mt-1 space-y-0.5">
              <p>Population: {fmtNum(hovered.population)}</p>
              <p>Violent: {fmtRate(hovered.violentRate)}/100K ({fmtNum(hovered.violentCrime)} total)</p>
              <p>Murder: {fmtRate(hovered.homicideRate)}/100K ({fmtNum(hovered.homicide)} total)</p>
              <p>Property: {fmtRate(hovered.propertyRate)}/100K</p>
              <p className={hovered.violentChange < 0 ? 'text-green-600' : 'text-red-600'}>
                YoY: {hovered.violentChange > 0 ? '+' : ''}{hovered.violentChange.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 justify-center">
          <span className="text-xs text-gray-500">Low</span>
          <div className="h-3 w-40 rounded-full" style={{
            background: `linear-gradient(to right, ${getColor(min, min, max)}, ${getColor((min + max) / 2, min, max)}, ${getColor(max, min, max)})`,
          }} />
          <span className="text-xs text-gray-500">High</span>
          <span className="text-xs text-gray-400 ml-2">({fmtRate(min)} – {fmtRate(max)} {metricInfo.unit})</span>
        </div>
      </div>

      {/* Ranking table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-heading text-xl font-bold">All States Ranked by {metricInfo.label}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">#</th>
                <th className="text-left p-3 font-semibold">State</th>
                <th className="text-right p-3 font-semibold">{metricInfo.label}</th>
                <th className="text-right p-3 font-semibold">Violent</th>
                <th className="text-right p-3 font-semibold">Murder</th>
                <th className="text-right p-3 font-semibold">Property</th>
                <th className="text-right p-3 font-semibold">YoY Change</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s, i) => (
                <tr key={s.abbr} className={`border-b hover:bg-gray-50 ${i < 3 ? 'bg-red-50/30' : i >= sorted.length - 3 ? 'bg-green-50/30' : ''}`}>
                  <td className="p-3 text-gray-400 font-bold">{i + 1}</td>
                  <td className="p-3">
                    <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline font-medium">
                      {s.name}
                    </Link>
                  </td>
                  <td className="p-3 text-right font-mono font-bold">{fmtRate(s[metric])}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(s.violentRate)}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(s.homicideRate)}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(s.propertyRate)}</td>
                  <td className={`p-3 text-right font-mono ${s.violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {s.violentChange > 0 ? '+' : ''}{s.violentChange.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
