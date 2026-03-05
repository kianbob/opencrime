'use client';
import { useState, useEffect, useRef } from 'react';

type CrimeClock = {
  violentCrime: number;
  murder: number;
  assault: number;
  robbery: number;
  rape: number;
  propertyCrime: number;
  burglary: number;
  larceny: number;
  motorVehicleTheft: number;
};

type National = {
  violentCrime: number;
  propertyCrime: number;
  homicide: number;
  population: number;
};

function AnimatedCounter({ perSecond, label, color, prefix = '', decimals = 0 }: {
  perSecond: number; label: string; color: string; prefix?: string; decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((Date.now() - startTime.current) / 1000 * perSecond);
    }, 50);
    return () => clearInterval(interval);
  }, [perSecond]);

  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <div className="text-center">
      <p className={`text-4xl md:text-6xl font-bold font-mono ${color}`}>
        {prefix}{display}
      </p>
      <p className="text-gray-400 text-sm md:text-base mt-2">{label}</p>
    </div>
  );
}

function ClockItem({ seconds, label, icon }: { seconds: number; label: string; icon: string }) {
  const [flash, setFlash] = useState(false);
  const elapsed = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      elapsed.current += 1;
      if (elapsed.current % seconds === 0) {
        setFlash(true);
        setTimeout(() => setFlash(false), 600);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const timeLabel = seconds >= 60
    ? `every ${Math.round(seconds / 60)} minute${seconds >= 120 ? 's' : ''}`
    : `every ${seconds} seconds`;

  return (
    <div className={`rounded-xl p-6 transition-all duration-300 ${flash ? 'bg-red-900/40 scale-105' : 'bg-white/5'}`}>
      <p className="text-3xl mb-2">{icon}</p>
      <p className="text-white font-bold text-lg">{label}</p>
      <p className="text-red-400 font-mono text-sm">{timeLabel}</p>
    </div>
  );
}

export default function NumbersClient({ crimeClock, national }: { crimeClock: CrimeClock; national: National }) {
  const totalCrimesPerSec = (national.violentCrime + national.propertyCrime) / (365.25 * 86400);
  const costPerSec = 2_600_000_000_000 / (365.25 * 86400); // $2.6T/year
  const victimsPerSec = (national.violentCrime + national.propertyCrime) / (365.25 * 86400);
  const murdersPerSec = national.homicide / (365.25 * 86400);

  return (
    <div className="space-y-16">
      {/* Crime Clock */}
      <section>
        <h2 className="font-display text-3xl font-bold text-white mb-2 text-center">The Crime Clock</h2>
        <p className="text-gray-400 text-center mb-8">Watch it tick. Each flash = another crime committed.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ClockItem seconds={crimeClock.violentCrime} label="Violent Crime" icon="🔴" />
          <ClockItem seconds={crimeClock.murder} label="Murder" icon="💀" />
          <ClockItem seconds={crimeClock.assault} label="Aggravated Assault" icon="👊" />
          <ClockItem seconds={crimeClock.robbery} label="Robbery" icon="🔫" />
          <ClockItem seconds={crimeClock.motorVehicleTheft} label="Car Stolen" icon="🚗" />
          <ClockItem seconds={crimeClock.burglary} label="Burglary" icon="🏠" />
        </div>
      </section>

      {/* Live counters */}
      <section>
        <h2 className="font-display text-3xl font-bold text-white mb-2 text-center">Since You Opened This Page</h2>
        <p className="text-gray-400 text-center mb-8">These counters are ticking in real time based on annual FBI data.</p>
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedCounter perSecond={totalCrimesPerSec} label="Total Crimes Committed" color="text-red-400" />
          <AnimatedCounter perSecond={costPerSec} label="Cost of Crime" color="text-green-400" prefix="$" decimals={0} />
          <AnimatedCounter perSecond={murdersPerSec} label="Murders" color="text-yellow-400" decimals={4} />
        </div>
      </section>

      {/* Big impact stats */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 rounded-2xl p-8 border border-red-700/30">
          <p className="text-5xl md:text-7xl font-bold text-red-400 mb-4">$2.6T</p>
          <p className="text-white text-xl font-semibold mb-2">The Annual Cost of Crime</p>
          <p className="text-gray-400">That&apos;s ${Math.round(costPerSec).toLocaleString()} every second. If crime were a country, its cost would make it the 8th largest economy in the world.</p>
        </div>
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-8 border border-blue-700/30">
          <p className="text-5xl md:text-7xl font-bold text-blue-400 mb-4">{(national.violentCrime + national.propertyCrime).toLocaleString()}</p>
          <p className="text-white text-xl font-semibold mb-2">Crimes Reported in 2024</p>
          <p className="text-gray-400">More Americans are crime victims each year than the entire population of Sweden (10.5M). And most crimes go unreported.</p>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-white">{national.homicide.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Murders in 2024</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-white">{national.violentCrime.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Violent Crimes</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-white">{national.propertyCrime.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Property Crimes</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-white">46%</p>
          <p className="text-gray-400 text-sm">Violent Crimes Unreported</p>
        </div>
      </section>

      {/* Speed comparisons */}
      <section>
        <h2 className="font-display text-3xl font-bold text-white mb-6 text-center">Put It In Perspective</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            { stat: 'A violent crime occurs every 26 seconds', sub: 'Faster than you can microwave popcorn' },
            { stat: 'A murder happens every 31 minutes', sub: 'Less than the length of a TV sitcom' },
            { stat: 'A car is stolen every 36 seconds', sub: 'About 2,400 per day, nearly 900,000 per year' },
            { stat: 'A burglary every 40 seconds', sub: 'Someone\'s home is broken into before you finish reading this section' },
            { stat: 'A property crime every 5 seconds', sub: 'You blinked? Another one just happened.' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4">
              <span className="text-2xl font-bold text-red-400 font-mono mt-1">{i + 1}</span>
              <div>
                <p className="text-white font-semibold text-lg">{item.stat}</p>
                <p className="text-gray-500 text-sm">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
