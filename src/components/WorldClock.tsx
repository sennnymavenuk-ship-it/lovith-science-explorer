import React, { useEffect, useState } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';

interface City {
  name: string;
  country: string;
  timeZone: string; // the official time zone name the browser understands
}

// One city from each part of the world, so children can see how time changes as you travel
const CITIES: City[] = [
  { name: 'London', country: 'United Kingdom', timeZone: 'Europe/London' },
  { name: 'Cairo', country: 'Egypt', timeZone: 'Africa/Cairo' },
  { name: 'Dubai', country: 'United Arab Emirates', timeZone: 'Asia/Dubai' },
  { name: 'New Delhi', country: 'India', timeZone: 'Asia/Kolkata' },
  { name: 'Tokyo', country: 'Japan', timeZone: 'Asia/Tokyo' },
  { name: 'Sydney', country: 'Australia', timeZone: 'Australia/Sydney' },
  { name: 'Los Angeles', country: 'United States', timeZone: 'America/Los_Angeles' },
  { name: 'New York', country: 'United States', timeZone: 'America/New_York' },
  { name: 'São Paulo', country: 'Brazil', timeZone: 'America/Sao_Paulo' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface ZoneTime {
  hour: number;
  minute: number;
  second: number;
  weekday: string;
  day: number;
  month: number;
  dayNumber: number; // whole days since 1970, used to compare dates between places
  offsetMinutes: number; // how far this place is from UTC
}

// Making a formatter is slow, so we make one per time zone and reuse it
const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    formatterCache.set(timeZone, formatter);
  }
  return formatter;
}

function getZoneTime(date: Date, timeZone: string): ZoneTime {
  const parts = getFormatter(timeZone).formatToParts(date);
  const read = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const year = Number(read('year'));
  const month = Number(read('month'));
  const day = Number(read('day'));
  const hour = Number(read('hour')) % 24; // some browsers write midnight as 24
  const minute = Number(read('minute'));
  const second = Number(read('second'));

  // Treat the clock reading as if it were UTC, then compare with the real UTC time.
  // The gap between the two is this place's offset from UTC.
  const readingAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  const realUtcSeconds = Math.floor(date.getTime() / 1000) * 1000;

  return {
    hour,
    minute,
    second,
    weekday: read('weekday'),
    day,
    month,
    dayNumber: Math.floor(Date.UTC(year, month - 1, day) / 86400000),
    offsetMinutes: Math.round((readingAsUtc - realUtcSeconds) / 60000),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

function formatClock(t: ZoneTime, use24Hour: boolean): { main: string; suffix: string } {
  if (use24Hour) return { main: `${pad(t.hour)}:${pad(t.minute)}`, suffix: '' };
  const hour12 = (t.hour % 12) || 12;
  return { main: `${hour12}:${pad(t.minute)}`, suffix: t.hour < 12 ? 'AM' : 'PM' };
}

function describeDifference(diffMinutes: number): string {
  if (diffMinutes === 0) return 'Same time as you';
  const abs = Math.abs(diffMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  const amount = [
    hours ? `${hours} hour${hours === 1 ? '' : 's'}` : '',
    minutes ? `${minutes} minutes` : '',
  ]
    .filter(Boolean)
    .join(' ');
  return `${amount} ${diffMinutes > 0 ? 'ahead of' : 'behind'} you`;
}

function describeDay(dayDifference: number): string {
  if (dayDifference === 0) return 'Today';
  return dayDifference > 0 ? 'Tomorrow' : 'Yesterday';
}

const ClockFace: React.FC<{ time: ZoneTime }> = ({ time }) => {
  const hourAngle = ((time.hour % 12) + time.minute / 60) * 30;
  const minuteAngle = (time.minute + time.second / 60) * 6;
  const secondAngle = time.second * 6;

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 shrink-0" aria-hidden="true">
      <circle cx="50" cy="50" r="47" className="fill-slate-950 stroke-slate-500" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="50"
          y1="8"
          x2="50"
          y2={i % 3 === 0 ? 16 : 12}
          transform={`rotate(${i * 30} 50 50)`}
          className="stroke-slate-300"
          strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
          strokeLinecap="round"
        />
      ))}
      {[
        ['12', 50, 27],
        ['3', 74, 50],
        ['6', 50, 74],
        ['9', 26, 50],
      ].map(([label, x, y]) => (
        <text
          key={label}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="11"
          className="fill-slate-300 font-bold"
        >
          {label}
        </text>
      ))}
      {/* Short thick hand = hours, long hand = minutes, thin red hand = seconds */}
      <line x1="50" y1="50" x2="50" y2="31" transform={`rotate(${hourAngle} 50 50)`} className="stroke-amber-300" strokeWidth="4.5" strokeLinecap="round" data-hand="hour" />
      <line x1="50" y1="50" x2="50" y2="19" transform={`rotate(${minuteAngle} 50 50)`} className="stroke-cyan-300" strokeWidth="3" strokeLinecap="round" data-hand="minute" />
      <line x1="50" y1="58" x2="50" y2="14" transform={`rotate(${secondAngle} 50 50)`} className="stroke-rose-400" strokeWidth="1.5" strokeLinecap="round" data-hand="second" />
      <circle cx="50" cy="50" r="3" className="fill-white" />
    </svg>
  );
};

interface ClockCardProps {
  title: string;
  subtitle: string;
  time: ZoneTime;
  local: ZoneTime;
  isLocal?: boolean;
  use24Hour: boolean;
}

const ClockCard: React.FC<ClockCardProps> = ({ title, subtitle, time, local, isLocal, use24Hour }) => {
  const isDay = time.hour >= 6 && time.hour < 18;
  const clock = formatClock(time, use24Hour);
  const dayLabel = describeDay(time.dayNumber - local.dayNumber);

  return (
    <div
      className={`rounded-3xl border-2 p-3 sm:p-5 flex flex-col items-center text-center gap-2 sm:gap-3 ${
        isLocal
          ? 'border-orange-400 bg-orange-950/40'
          : isDay
          ? 'border-amber-400/40 bg-gradient-to-br from-amber-500/15 to-slate-900'
          : 'border-indigo-400/40 bg-gradient-to-br from-indigo-900/60 to-slate-900'
      }`}
    >
      <div className="w-full flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-xs font-bold text-slate-300">
        <span className="flex items-center gap-1.5">
          {isDay ? <Sun className="w-4 h-4 text-amber-300" aria-hidden="true" /> : <Moon className="w-4 h-4 text-indigo-300" aria-hidden="true" />}
          {isDay ? 'Daytime' : 'Night-time'}
        </span>
        <span>{dayLabel}</span>
      </div>

      <ClockFace time={time} />

      <div>
        <h3 className="text-base sm:text-lg font-black text-white leading-tight">{title}</h3>
        <p className="text-xs font-bold text-slate-400">{subtitle}</p>
      </div>

      <p className="font-black text-white tabular-nums text-center" data-time>
        <span className="text-2xl sm:text-3xl whitespace-nowrap">
          {clock.main}
          <span className="text-sm sm:text-base text-slate-300">:{pad(time.second)}</span>
        </span>
        {clock.suffix && <span className="text-sm sm:text-base text-slate-300">{' '}{clock.suffix}</span>}
      </p>

      <p className="text-xs font-bold text-slate-300">
        {time.weekday} {time.day} {MONTHS[time.month - 1]}
      </p>

      {!isLocal && (
        <p className="text-xs font-black text-orange-300" data-difference>
          {describeDifference(time.offsetMinutes - local.offsetMinutes)}
        </p>
      )}
    </div>
  );
};

export const WorldClock: React.FC = () => {
  const [now, setNow] = useState(() => new Date());
  const [use24Hour, setUse24Hour] = useState(false);
  const [localZone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');

  // Update once a second
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const local = getZoneTime(now, localZone);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white flex items-center gap-3">
            <Globe className="w-8 h-8 text-orange-400" aria-hidden="true" />
            World Clock
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-2">
            The Earth spins, so it is morning in one place while it is night in another. What time is it around the world right now?
          </p>
        </div>

        <div className="flex gap-2 shrink-0" role="group" aria-label="Choose how to show the time">
          <button
            type="button"
            onClick={() => setUse24Hour(false)}
            aria-pressed={!use24Hour}
            className={`px-4 py-2 rounded-xl text-sm font-black border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
              !use24Hour ? 'bg-orange-400 text-slate-950 border-orange-300' : 'bg-slate-950 text-slate-200 border-indigo-500/30 hover:border-orange-400/60'
            }`}
          >
            12-hour
          </button>
          <button
            type="button"
            onClick={() => setUse24Hour(true)}
            aria-pressed={use24Hour}
            className={`px-4 py-2 rounded-xl text-sm font-black border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
              use24Hour ? 'bg-orange-400 text-slate-950 border-orange-300' : 'bg-slate-950 text-slate-200 border-indigo-500/30 hover:border-orange-400/60'
            }`}
          >
            24-hour
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
        <ClockCard title="Your time" subtitle="On this device" time={local} local={local} isLocal use24Hour={use24Hour} />
        {CITIES.map((city) => (
          <ClockCard
            key={city.timeZone}
            title={city.name}
            subtitle={city.country}
            time={getZoneTime(now, city.timeZone)}
            local={local}
            use24Hour={use24Hour}
          />
        ))}
      </div>
    </section>
  );
};
