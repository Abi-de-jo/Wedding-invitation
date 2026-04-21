"use client";

import { useEffect, useState } from "react";

export default function CountdownSection() {
  const [mounted, setMounted] = useState(false);

  const targetDate = new Date("2026-05-18T00:00:00").getTime();

  const getTimeLeft = () => {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      days: String(Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: String(
        Math.floor((diff / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0"),
      minutes: String(
        Math.floor((diff / (1000 * 60)) % 60)
      ).padStart(2, "0"),
      seconds: String(
        Math.floor((diff / 1000) % 60)
      ).padStart(2, "0"),
    };
  };

  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());

    const timer = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const Box = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border rounded-lg mb-2 border-[#5C2018]">
        <span className="text-2xl md:text-3xl text-[#5C2018] font-semibold">
          {value}
        </span>
      </div>

      <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#5C2018]">
        {label}
      </span>
    </div>
  );

  return (
    <section className="-mt-40 bg-white flex flex-col items-center justify-center px-8 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl mb-2 text-[#5C2018] handlee">
          Countdown
        </h2>
      </div>

      <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
        <Box value={time.days} label="Days" />
        <Box value={time.hours} label="Hours" />
        <Box value={time.minutes} label="Min" />
        <Box value={time.seconds} label="Sec" />
      </div>

      <p className="text-sm font-semibold tracking-wide mt-10 text-[#5C2018]">
        until the big day
      </p>

      <style jsx>{`
        .handlee {
          font-family: "Handlee", cursive;
        }

        @import url("https://fonts.googleapis.com/css2?family=Handlee&display=swap");
      `}</style>
    </section>
  );
}