"use client";

import React, { useState, useEffect } from "react";
import Text from "./Text";
import { BonVivantFont } from "@/style/fonts";

const targetDate = new Date("October 10, 2026 12:00:00");
const endDate = new Date("October 10, 2026 14:00:00");

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountDown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft(): TimeLeft {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  function getGoogleCalendarUrl() {
    const start = targetDate.toISOString().replace(/-|:|\.\d+/g, "");
    const end = endDate.toISOString().replace(/-|:|\.\d+/g, "");
    const title = encodeURIComponent("Tasyakuran Pernikahan Ardian & Anya");
    const details = encodeURIComponent("Event Details: Tasyakuran Pernikahan Ardian & Anya");
    const location = encodeURIComponent("Jl. Puri Dinar Elok Blok E-V No. 6 Meteseh Kec. Tembalang Kota Semarang Jawa Tengah 50271");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
  }

  if (!isClient) {
    // Prevent rendering on the server to avoid mismatch
    return null;
  }

  return (
    <div className="countdown-container flex flex-col items-center bg-white/90 border border-gray-200/90 shadow-xs py-20pxr px-16pxr text-14pxr leading-25pxr rounded-xl text-gray-900">
      {/* <Text
        className={`text-10pxr medium:text-20pxr large:text-24pxr leading-none ${BonVivantFont.className}`}
      >
        Countdown
      </Text> */}
      <Text className="text-center text-gray-900 font-bold text-16pxr">
        {timeLeft.days !== undefined ? (
          <>
            {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes}{" "}
            Minutes {timeLeft.seconds} Seconds
          </>
        ) : (
          "The event has started!"
        )}
      </Text>
      <a
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-5 py-2.5 bg-gray-900 text-white rounded-full hover:bg-black font-semibold text-14pxr shadow-xs transition-colors focus:outline-2 focus:outline-black"
      >
        Remind Me on Google Calendar
      </a>
    </div>
  );
};

export default CountDown;