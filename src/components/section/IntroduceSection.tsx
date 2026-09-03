"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Text, { TextProps } from "../Text";
import { BonVivantFont } from "@/style/fonts";
import Flex from "../Flex";
import Image from "next/image";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import useIsInView from "@/hooks/useIsInView";
import Glare from "../../../public/glare/glare.svg";

const Title = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={`h-48pxr medium:h-61pxr large:h-67pxr pt-8pxr ${className}`}
      {...props}
    />
  );
};

const IntroduceSection = ({ visitedWelcome }: { visitedWelcome: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const intervalId2 = useRef<NodeJS.Timeout | null>(null);
  const intervalId3 = useRef<NodeJS.Timeout | null>(null);

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

    const timeoutID = setTimeout(() => {
      intervalId2.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === 8) {
            clearInterval(intervalId2.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 400);
    }, 1000);

    const timeoutID2 = setTimeout(() => {
      intervalId3.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === 11) {
            clearInterval(intervalId3.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 900);
    }, 1800);
  }, []);

  useEffect(() => {
    if (transitionIds.length === 12) {
      clearInterval(intervalId.current!);
      clearInterval(intervalId2.current!);
      clearInterval(intervalId3.current!);
    }
  }, [transitionIds]);

  useIsInView(ref, handleTransition, !visitedWelcome);

  return (
    <section ref={ref} id="introduce" className="w-full h-screen relative flex flex-col justify-between py-10 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          priority
          loading="eager"
          quality={100}
          src="/hero/hero-2.jpeg"
          fill
          sizes="(max-width: 450px) 100vw, 450px"
          alt="background"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
      </div>

      <div
        className={`${BonVivantFont.className} text-54pxr leading-48pxr medium:text-72pxr medium:leading-64pxr w-full gap-2 text-white drop-shadow-md z-10 relative px-2 pt-2`}
      >
        <SlideUp
          show={transitionIds.includes(0)}
          style={{ transform: "translate(-0.75rem)" }}
        >
          <Title display="block">DUA</Title>
        </SlideUp>
        <Spacing size={8} />
        <Flex direction="row" align="center" justify="end">
          <SlideUp
            show={transitionIds.includes(6)}
            className="flex-none w-44pxr h-44pxr medium:w-48pxr medium:h-48pxr large:w-52pxr large:h-52pxr"
          >
            <Glare />
          </SlideUp>
          <SlideUp
            show={transitionIds.includes(1)}
            style={{ transform: "translate(0.75rem)" }}
          >
            <Title display="block" className="text-right">
              HATI
            </Title>
          </SlideUp>
        </Flex>
        <Spacing size={8} />
        <SlideUp
          show={transitionIds.includes(2)}
          style={{ transform: "translate(-0.75rem)" }}
        >
          <Title display="block">BERSATU</Title>
        </SlideUp>
      </div>

      <div
        className={`${BonVivantFont.className} text-54pxr leading-48pxr medium:text-72pxr medium:leading-64pxr w-full gap-2 text-white drop-shadow-md z-10 relative px-2 pb-2`}
      >
        <SlideUp
          show={transitionIds.includes(3)}
          className="w-full"
          style={{ transform: "translate(0.75rem)" }}
        >
          <Title display="block" className="text-right">
            SATU
          </Title>
        </SlideUp>
        <Spacing size={8} />
        <Flex direction="row" align="center" justify="start">
          <SlideUp show={transitionIds.includes(4)}>
            <Title display="block" style={{ transform: "translate(-0.75rem)" }}>
              CINTA
            </Title>
          </SlideUp>
          <SlideUp
            show={transitionIds.includes(7)}
            className="flex-none w-44pxr h-44pxr medium:w-48pxr medium:h-48pxr large:w-52pxr large:h-52pxr"
          >
            <Glare />
          </SlideUp>
        </Flex>
        <Spacing size={8} />
        <SlideUp show={transitionIds.includes(5)}>
          <Flex direction="row" align="start" justify="end">
            <Title style={{ transform: "translate(0.55rem)" }}>ABADI</Title>
          </Flex>
        </SlideUp>
      </div>
    </section>
  );
};

export default IntroduceSection;
