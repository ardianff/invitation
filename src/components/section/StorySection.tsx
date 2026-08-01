"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { BonVivantFont } from "@/style/fonts";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";
import Text from "../Text";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";
import Image from "next/image";
import Subtitle from "./Subtitle";

const TITLE = ["The Groom & Bride"];

const Story = ({ visitedWelcome }: { visitedWelcome: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const [startTransition, setStartTransition] = useState(false);
  const [callTimeout, setCallTimeout] = useState(false);

  const handleTransition = useCallback(() => {
    intervalId.current = setInterval(() => {
      setTransitionIds((prev) => {
        if (prev.length === 6) {
          clearInterval(intervalId.current!);
          return prev;
        }
        return prev.concat(prev.length);
      });
    }, 200);
  }, []);

  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;

    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 200);

  useInterval(() => {
    if (
      !startTransition ||
      !callTimeout ||
      transitionIds.length >= TITLE.length + 5
    )
      return;
    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 200);

  useEffect(() => {
    if (!startTransition) return;
    setTimeout(() => {
      setCallTimeout(true);
    }, 1000);
  }, [startTransition]);

  useEffect(() => {
    if (transitionIds.length === 4) {
      setStartTransition(false);
    }
  }, [transitionIds]);

  useIsInView(ref, handleTransition, !visitedWelcome);

  return (
    <section id="reli-section" ref={ref} className="w-full px-24pxr relative">
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

      <div className="flex justify-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full border border-gray-800 bg-white/50">
          {/* <div className="absolute inset-0 rounded-full border-2 border-white"></div> */}
          <Text
            className={`text-10pxr medium:text-20pxr large:text-24pxr leading-none text-gray-900 font-bold ${BonVivantFont.className}`}
          >
            T&A
          </Text>
        </div>
      </div>

      <Spacing size={15} />

      {/* Section 2 */}
      <div className="text-center text-gray-900">
        {TITLE.map((title, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Title key={title} display="block">
              {title}
            </Title>
          </SlideUp>
        ))}
      </div>

      <Spacing size={15} />

      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <Text
          display="inline-block"
          className={`whitespace-pre-line text-center text-14pxr leading-22pxr text-gray-900 font-medium`}
        >
          {`Assalamu'alaikum Warahmatullaahi Wabarakaatuh. Dengan memohon Rahmat dan Ridho Allah SWT. Kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada acara Pernikahan  kami:`}
        </Text>
      </SlideUp>

      <Spacing size={50} />

      {/* section couple */}
      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <div className="w-full flex flex-row items-center gap-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-gray-200/80 shadow-md shadow-gray-200/50">
          <Spacing size={4} />
          <Image
            src="/profile/object-2.jpeg"
            alt="Tutie Alawiyah"
            width={125}
            height={125}
            style={{ width: "auto", height: "auto" }}
            className="rounded-full flex-none border border-gray-300 shadow-xs"
          />
          <Spacing size={4} />
          <div className="flex flex-col gap-1 text-gray-900">
            <Subtitle display="block">
              Tutie Alawiyah
            </Subtitle>
            <Text display="inline-block" className="whitespace-pre-line text-13pxr leading-19pxr text-gray-800 font-medium">
              Putri pertama dari <br />
              <strong className="text-gray-900 font-bold">Bapak Sanusi</strong> &amp; <strong className="text-gray-900 font-bold">Ibu Muyassaroh</strong>
            </Text>
          </div>
        </div>
      </SlideUp>

      <div className="flex justify-center my-2">
        <span className={`${BonVivantFont.className} text-28pxr text-gray-500 font-bold drop-shadow-xs`}>&amp;</span>
      </div>

      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <div className="w-full flex flex-row items-center gap-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-gray-200/80 shadow-md shadow-gray-200/50">
          <Spacing size={4} />
          <div className="flex flex-col gap-1 text-right flex-grow text-gray-900">
            <Subtitle display="block">Muhammad Rafli Andreansyah</Subtitle>
            <Text display="inline-block" className="whitespace-pre-line text-13pxr leading-19pxr text-gray-800 font-medium">
              Putra pertama dari <br />
              <strong className="text-gray-900 font-bold">Bapak Muhammad Saerozi, M. Pd</strong> &amp; <strong className="text-gray-900 font-bold">Ibu Fauziah</strong>
            </Text>
          </div>
          <Spacing size={4} />
          <Image
            src="/profile/object-1.jpeg"
            alt="Muhammad Rafli Andreansyah"
            width={125}
            height={125}
            style={{ width: "auto", height: "auto" }}
            className="rounded-full flex-none border border-gray-300 shadow-xs"
          />
        </div>
      </SlideUp>
      {/* section couple */}

      <Spacing size={50} />

      <div className="border-b border-gray-300"></div>

      <Spacing size={50} />

      {/* Section 2 */}

      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <Text
          display="inline-block"
          className={`whitespace-pre-line text-center text-14pxr leading-24pxr text-gray-900 font-medium italic bg-white/60 p-4 rounded-xl border border-gray-200/60`}
        >
          {`"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."`}
        </Text>
      </SlideUp>

      <Spacing size={15} />

      <div className="text-center pb-24 text-gray-900">
        <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
          <Subtitle display="block">QS Ar-Rum 21</Subtitle>
        </SlideUp>
      </div>

      {/* Section 1 */}
    </section>
  );
};

export default Story;
