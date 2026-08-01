"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Address from "./Address";
import Image from "next/image";
import Navigations from "./Navigations";
import RollingBanner from "../RollingBanner";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import useIsInView from "@/hooks/useIsInView";
import CountDown from "../CountDown";
import { BonVivantFont } from "@/style/fonts";

const TITLE = ["Series of Events"];
const AddressSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const handleTransition = useCallback(() => {
    setTimeout(() => {
      setTransitionIds((prev) => (prev.length === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : prev));
    }, 0);

    setTimeout(() => {
      intervalId.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === TITLE.length + 9) {
            clearInterval(intervalId.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 200);
    }, 1000);
  }, []);

  useIsInView(ref, handleTransition);

  useEffect(() => {
    if (transitionIds.length > TITLE.length + 9) {
      clearInterval(intervalId.current!);
      intervalId.current = null;
    }
  }, [transitionIds]);

  return (
    <>
      <section
        ref={ref}
        id="address-section"
        className="w-full px-24pxr relative pb-10 text-center"
      >
        <div className="absolute inset-0">
          <Image
            quality={100}
            src="/welcome/bg.png"
            fill
            sizes="(max-width: 450px) 100vw, 450px"
            alt="background"
            className="-z-10 rounded-[1.25rem] object-cover"
          />
        </div>

        <Spacing size={50} />
        {TITLE.map((title, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Title>{title}</Title>
          </SlideUp>
        ))}
        <Spacing size={16} />

        {/* Akad Nikah */}
        <div className="flex flex-col bg-white/90 border border-gray-200/90 shadow-xs py-4 px-4 lg:px-6 text-14pxr leading-25pxr rounded-xl text-gray-900">
          <SlideUp show={transitionIds.includes(TITLE.length)}>
            <Address
              title="Akad Nikah"
              desc={`Sabtu, 05 September 2026 \n 09.00 WIB s/d Selesai`}
            />
          </SlideUp>
          <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
            <div className="flex flex-row gap-4 w-full p-4 text-14pxr leading-22pxr bg-gray-100 border border-gray-200 text-gray-900 mt-4 rounded-md items-center text-left">
              <Text display="block" className="flex-grow font-medium text-gray-900">
                Dusun 1 Seda Banjarwangunan RT.003/RW.002 No. 40 Gg. Masjid Al Amin, Kec. Mundu Kab. Cirebon Jawa Barat
              </Text>
              <Navigations href="https://maps.app.goo.gl/wBG6pjtee25Q4oRW9?g_st=ic" />
            </div>
          </SlideUp>
        </div>

        <Spacing size={16} />

        {/* Resepsi */}
        <div className="flex flex-col bg-white/90 border border-gray-200/90 shadow-xs py-4 px-4 lg:px-6 text-14pxr leading-25pxr rounded-xl text-gray-900">
          <SlideUp show={transitionIds.includes(TITLE.length + 2)}>
            <Address
              title="Resepsi Nikah"
              desc={`Sabtu, 05 September 2026 \n 11.00 WIB s/d Selesai`}
            />
          </SlideUp>
          <SlideUp show={transitionIds.includes(TITLE.length + 3)}>
            <div className="flex flex-row gap-4 w-full p-4 text-14pxr leading-22pxr bg-gray-100 border border-gray-200 text-gray-900 mt-4 rounded-md items-center text-left">
              <Text display="block" className="flex-grow font-medium text-gray-900">
                Dusun 1 Seda Banjarwangunan RT.003/RW.002 No. 40 Gg. Masjid Al Amin, Kec. Mundu Kab. Cirebon Jawa Barat
              </Text>
              <Navigations href="https://maps.app.goo.gl/wBG6pjtee25Q4oRW9?g_st=ic" />
            </div>
          </SlideUp>
        </div>

        <Spacing size={16} />

        {/* Ngunduh Mantu */}
        <div className="flex flex-col bg-white/90 border border-gray-200/90 shadow-xs py-4 px-4 lg:px-6 text-14pxr leading-25pxr rounded-xl text-gray-900">
          <SlideUp show={transitionIds.includes(TITLE.length + 4)}>
            <Address
              title="Ngunduh Mantu"
              desc={`Senin, 07 September 2026 \n 10.00 WIB s/d Selesai`}
            />
          </SlideUp>
          <SlideUp show={transitionIds.includes(TITLE.length + 5)}>
            <div className="flex flex-row gap-4 w-full p-4 text-14pxr leading-22pxr bg-gray-100 border border-gray-200 text-gray-900 mt-4 rounded-md items-center text-left">
              <Text display="block" className="flex-grow font-medium text-gray-900">
                Jl. KH. A. Sya’roni, RT.1/RW.1, No. 27 Desa Kertasinduyasa, Jatibarang, Kab. Brebes Jawa Tengah
              </Text>
              <Navigations href="https://maps.app.goo.gl/yR4NdAtWEBJ8RhXz7?g_st=ic" />
            </div>
          </SlideUp>
        </div>

        <SlideUp show={transitionIds.includes(TITLE.length + 6)}>
          <Spacing size={10} />
          <CountDown />
          <Spacing size={10} />
          <RollingBanner />
        </SlideUp>
      </section>
    </>
  );
};

export default AddressSection;
