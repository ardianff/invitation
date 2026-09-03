"use client";

import React, { useEffect, useRef, useState } from "react";

import Calendar from "../Calendar";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";

import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";


const TITLE = [
  "10.10.2026",
  "SABTU",
  "12:00 WIB - SELESAI",
];


const CalendarSection = () => {

  const ref = useRef<HTMLDivElement>(null);

  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);
  const [callTimeout, setCallTimeout] = useState(false);



  useInterval(() => {

    if (
      !startTransition ||
      transitionIds.length >= TITLE.length
    ) {
      return;
    }


    setTransitionIds((prev) => [
      ...prev,
      prev.length
    ]);


  },200);



  useInterval(() => {

    if (
      !startTransition ||
      !callTimeout ||
      transitionIds.length >= TITLE.length + 1
    ) {
      return;
    }


    setTransitionIds((prev)=>[
      ...prev,
      prev.length
    ]);


  },200);



  useEffect(()=>{

    if(!startTransition) return;


    const timer = setTimeout(()=>{

      setCallTimeout(true);

    },1000);


    return()=>clearTimeout(timer);


  },[startTransition]);



  useEffect(()=>{

    if(
      transitionIds.length === TITLE.length + 1
    ){

      setStartTransition(false);

    }

  },[transitionIds]);



  useIsInView(ref,()=>{

    setStartTransition(true);

  });



  return (

    <section
      id="calendar-section"
      ref={ref}
      className="w-full px-6 text-center"
    >


      {/* TITLE */}

      {TITLE.map((title,index)=>(

        <SlideUp
          key={index}
          show={transitionIds.includes(index)}
        >

          <Title display="block">
            {title}
          </Title>


        </SlideUp>

      ))}



      <Spacing size={15}/>



      {/* CALENDAR OKTOBER 2026 */}

      <SlideUp
        show={
          transitionIds.includes(TITLE.length)
        }
        className="w-full"
      >


        <Calendar>


          <Calendar.Days />



          <Calendar.Dates

            startDate={1}

            endDate={31}

            activeDate={10}

          />


        </Calendar>



      </SlideUp>



    </section>

  );

};


export default CalendarSection;