import React, { ReactNode } from "react";

import SlideUp from "./SlideUp";
import Text from "./Text";

const Calendar = ({ children }: { children: ReactNode }) => {
  return <div className="w-full grid grid-cols-7 gap-y-12pxr">{children}</div>;
};

Calendar.Days = () => {
  return ["M", "S", "S", "R", "K", "J", "S"].map((day, i) => (
    <Text
      key={`${day}-${i}`}
      display="block"
      className={`font-bold first-letter:w-full py-7.5pxr text-center flex items-center justify-center ${
        i === 0 ? "text-[#00AEFF]" : "text-black"
      }`}
    >
      {day}
    </Text>
  ));
};

Calendar.Dates = ({
  startDate,
  endDate,
  activeDate
}: {
  startDate: number;
  endDate: number;
  activeDate: number;
}) => {
  return Array.from({ length: endDate - startDate + 1 }).map((_, i) => {
    const dayNumber = startDate + i;
    const isActive = dayNumber === activeDate;
    return (
      <div
        key={i}
        className={`w-full text-center flex justify-center items-center`}
      >
        {dayNumber > 0 && dayNumber <= 30 ? (
          <Text
            display="block"
            className={`w-40pxr h-40pxr rounded-full items-center flex justify-center ${
              isActive
                ? "bg-gray-900 font-bold text-white shadow-xs"
                : i % 7 === 0
                ? "text-blue-600 font-semibold"
                : "text-gray-900 font-medium"
            }`}
          >
            {dayNumber}
          </Text>
        ) : (
          <div className="w-40pxr h-40pxr" />
        )}
      </div>
    );
  });
};
export default Calendar;
