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
              desc={`Sabtu, 03 Oktober 2026 \n 08.00 WIB s/d Selesai`}
            />
          </SlideUp>
          <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
            <div className="flex flex-row gap-4 w-full p-4 text-14pxr leading-22pxr bg-gray-100 border border-gray-200 text-gray-900 mt-4 rounded-md items-center text-left">
              <Text display="block" className="flex-grow font-medium text-gray-900">
                Gedung Semeru, Jl. Elang Raya No.2, Mangunharjo, Kec. Tembalang, Kota Semarang, Jawa Tengah 50272
              </Text>
              <Navigations href="https://maps.app.goo.gl/ZiCfNVZL3e7JyCgy7" />
            </div>
          </SlideUp>
        </div>

        <Spacing size={16} />

        {/* Resepsi */}
        <div className="flex flex-col bg-white/90 border border-gray-200/90 shadow-xs py-4 px-4 lg:px-6 text-14pxr leading-25pxr rounded-xl text-gray-900">
          <SlideUp show={transitionIds.includes(TITLE.length + 2)}>
            <Address
              title="Resepsi Nikah"
              desc={`Sabtu, 03 Oktober 2026 \n 12.00 WIB s/d 14.00 WIB`}
            />
          </SlideUp>
          <SlideUp show={transitionIds.includes(TITLE.length + 3)}>
            <div className="flex flex-row gap-4 w-full p-4 text-14pxr leading-22pxr bg-gray-100 border border-gray-200 text-gray-900 mt-4 rounded-md items-center text-left">
              <Text display="block" className="flex-grow font-medium text-gray-900">
                Gedung Semeru, Jl. Elang Raya No.2, Mangunharjo, Kec. Tembalang, Kota Semarang, Jawa Tengah 50272
              </Text>
              <Navigations href="https://maps.app.goo.gl/ZiCfNVZL3e7JyCgy7" />
            </div>
          </SlideUp>
        </div>

        <Spacing size={16} />

        {/* Tasyakuran Pernikahan */}
        <div className="flex flex-col bg-white/90 border border-gray-200/90 shadow-xs py-4 px-4 lg:px-6 text-14pxr leading-25pxr rounded-xl text-gray-900">
          <SlideUp show={transitionIds.includes(TITLE.length + 4)}>
            <Address
              title="Tasyakuran Pernikahan"
              desc={`Sabtu, 10 Oktober 2026 \n 12.00 WIB s/d 14.00 WIB`}
            />
          </SlideUp>
          <SlideUp show={transitionIds.includes(TITLE.length + 5)}>
            <div className="flex flex-row gap-4 w-full p-4 text-14pxr leading-22pxr bg-gray-100 border border-gray-200 text-gray-900 mt-4 rounded-md items-center text-left">
              <Text display="block" className="flex-grow font-medium text-gray-900">
                Jl. Puri Dinar Elok Blok E-V No. 6 Meteseh Kec. Tembalang Kota Semarang Jawa Tengah 50271
              </Text>
              <Navigations href="https://maps.app.goo.gl/FVH32pqQgrUGPNQ37" />
            </div>
          </SlideUp>
        </div>

        <SlideUp show={transitionIds.includes(TITLE.length + 6)}>
          <Spacing size={10} />
          {/* <CountDown /> */}
          <Spacing size={10} />
          <RollingBanner />
        </SlideUp>
      </section>
    </>
  );
};

export default AddressSection;