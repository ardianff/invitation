"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
} from "date-fns";

import { id } from "date-fns/locale";


const EVENT = {

  title:
    "Tasyakuran Pernikahan Ardian & Anya",

  date:
    new Date(2026, 9, 10),

  start:
    new Date("October 10, 2026 12:00:00"),

  end:
    new Date("October 10, 2026 14:00:00"),


  location:
    "Jl. Puri Dinar Elok Blok E-V No. 6 Meteseh Kec. Tembalang Kota Semarang Jawa Tengah 50271",


  maps:
    "https://maps.app.goo.gl/FVH32pqQgrUGPNQ37"

};



export default function WeddingCalendar() {


  const monthStart =
    startOfMonth(EVENT.date);


  const monthEnd =
    endOfMonth(EVENT.date);



  const days =
    eachDayOfInterval({

      start: monthStart,

      end: monthEnd,

    });



  const emptyDays =
    Array(
      getDay(monthStart)
    ).fill(null);





  function googleCalendarUrl(){


    const start =
      EVENT.start
      .toISOString()
      .replace(/-|:|\.\d+/g,"");


    const end =
      EVENT.end
      .toISOString()
      .replace(/-|:|\.\d+/g,"");



    return (

      "https://calendar.google.com/calendar/render?action=TEMPLATE"
      +
      `&text=${encodeURIComponent(EVENT.title)}`
      +
      `&dates=${start}/${end}`
      +
      `&details=${encodeURIComponent(
        "Menghadiri acara tasyakuran pernikahan Ardian & Anya"
      )}`
      +
      `&location=${encodeURIComponent(EVENT.location)}`
      +
      "&sf=true&output=xml"

    );

  }





  return (

    <div
      className="
        mx-auto
        w-full
        max-w-sm
        rounded-3xl
        bg-white/90
        p-6
        shadow-xl
        border
        border-rose-100
      "
    >



      <div
        className="
          mb-6
          text-center
        "
      >

        <p
          className="
            text-xs
            tracking-[0.35em]
            text-rose-400
          "
        >
          SAVE THE DATE
        </p>


        <h2
          className="
            mt-2
            text-3xl
            font-serif
            capitalize
            text-gray-700
          "
        >

          {
            format(
              EVENT.date,
              "MMMM yyyy",
              {
                locale:id
              }
            )
          }

        </h2>

      </div>





      <div
        className="
          mb-3
          grid
          grid-cols-7
          text-center
          text-xs
          font-semibold
          text-gray-400
        "
      >

        {
          [
            "Min",
            "Sen",
            "Sel",
            "Rab",
            "Kam",
            "Jum",
            "Sab",
          ].map(day=>(

            <div key={day}>
              {day}
            </div>

          ))
        }

      </div>





      <div
        className="
          grid
          grid-cols-7
          gap-y-4
          text-center
        "
      >


        {
          emptyDays.map((_,i)=>(

            <div key={i}/>

          ))
        }



        {
          days.map(day=>{


            const active =
              isSameDay(
                day,
                EVENT.date
              );


            return (

              <div
                key={day.toString()}
                className="
                  flex
                  justify-center
                  items-center
                "
              >

                <div
                  className={`
                    relative
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-sm

                    ${
                      active
                      ?
                      "bg-rose-400 text-white shadow-lg scale-110 font-bold"
                      :
                      "text-gray-600"
                    }

                  `}
                >

                  {
                    format(day,"d")
                  }


                  {
                    active &&
                    (
                      <span
                        className="
                          absolute
                          -right-2
                          -top-3
                        "
                      >
                        ❤️
                      </span>
                    )
                  }


                </div>

              </div>

            );


          })
        }


      </div>





      {/* BUTTON */}

      <div
        className="
          mt-8
          flex
          flex-col
          gap-3
        "
      >


        <a
          href={googleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="
            rounded-full
            bg-gray-900
            px-5
            py-3
            text-center
            text-sm
            font-semibold
            text-white
          "
        >

          💌 Simpan ke Google Calendar

        </a>



        <a
          href={EVENT.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="
            rounded-full
            border
            border-gray-900
            px-5
            py-3
            text-center
            text-sm
            font-semibold
            text-gray-900
          "
        >

          📍 Buka Lokasi Acara

        </a>


      </div>





      <p
        className="
          mt-5
          text-center
          text-xs
          leading-relaxed
          text-gray-500
        "
      >

        {EVENT.location}

      </p>



    </div>

  );

}