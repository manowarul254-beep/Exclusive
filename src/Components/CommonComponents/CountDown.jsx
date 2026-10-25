import React, { useEffect, useState } from "react";

// তারিখ পেরিয়ে গেলে এই সময় পরপর নতুন করে শুরু হবে (৩ দিন)
const CYCLE_MS = 3 * 24 * 60 * 60 * 1000;

const pad = (n) => String(n).padStart(2, "0");

// বাকি সময় বের করা
const getTimeLeft = (targetDate) => {
  const target = new Date(targetDate).getTime();
  const now = Date.now();

  let diff = target - now;

  // তারিখ পেরিয়ে গেলে পরের চক্রের বাকি সময় দেখাবে
  if (diff <= 0) {
    diff = CYCLE_MS - ((now - target) % CYCLE_MS);
  }

  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

const CountDown = ({ targetDate = "2026-11-30T12:00:00" }) => {
  const [count, setCount] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    setCount(getTimeLeft(targetDate));

    const timer = setInterval(() => {
      setCount(getTimeLeft(targetDate));
    }, 1000);

    // পেজ ছেড়ে গেলে timer বন্ধ হবে
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: count.days },
    { label: "Hours", value: count.hours },
    { label: "Minutes", value: count.minutes },
    { label: "Seconds", value: count.seconds },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-4.5">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div>
            <h3 className="text-xs sm:text-base">{unit.label}</h3>
            <h2 className="text-2xl sm:text-[32px] font-bold">
              {pad(unit.value)}
            </h2>
          </div>

          {/* শেষটা বাদে প্রতিটার পরে লাল কোলন */}
          {index < units.length - 1 && (
            <span className="text-primary text-2xl sm:text-3xl mt-4">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CountDown;