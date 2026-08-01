"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { BonVivantFont } from "@/style/fonts";
import Flex from "../Flex";
import ScrollArrow from "../../../public/scroll_arrow.svg";
import SlideUp from "../SlideUp";
import Text from "../Text";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["THE", "WEDDING", "OF", "TUTIE", "AND", "ANDRE"];
const Welcome = ({
  className,
  onNext,
}: {
  className?: string;
  onNext: () => void;
}) => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);

  useInterval(() => {
    if (
      !startTransition ||
      transitionIds.length > TITLE.length ||
      !imageLoaded
    ) {
      return;
    }
    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 100);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!startTransition || !imageLoaded) return;

    const timeout = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 1800);

    const timeout2 = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [startTransition, imageLoaded]);

  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (visible) return;

    const timeoutId = setTimeout(() => {
      setHidden(true);
    }, 1100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [visible, imageLoaded]);

  useEffect(() => {
    if (hidden) {
      onNext();
    }
  }, [hidden, onNext]);

  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [recipient, setRecipient] = useState<string | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    imageRef.current.complete && setImageLoaded(true);
    const urlParams = new URLSearchParams(window.location.search);
    const to = urlParams.get("to");
    if (to) {
      setRecipient(decodeURIComponent(to));
    }
  }, [imageRef]);

  useIsInView(ref, () => setStartTransition(true));

  if (hidden) return null;

  return (
    <div
      ref={ref}
      style={{ height: "100svh", transition: "opacity 1s" }}
      className={`relative bg-black w-full flex flex-col justify-end overflow-hidden pb-20pxr ${className} ${visible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80 z-10" />
      <Image
        ref={imageRef}
        priority
        loading="eager"
        fill
        sizes="(max-width: 450px) 100vw, 450px"
        alt="wedding"
        src="/welcome/hero.jpeg"
        className="object-cover"
        onLoad={() => {
          setImageLoaded(true);
        }}
      />

      {/* Title & Recipient content grouped together below the hands */}
      <Flex className="z-20 relative mx-auto px-16pxr items-center mb-10pxr w-full">
        <Flex className="mb-3">
          {TITLE.map((text, index) => (
            <SlideUp key={index} show={transitionIds.includes(index)}>
              <Text
                key={index}
                className={`pt-2pxr text-24pxr leading-32pxr medium:text-34pxr medium:leading-40pxr large:text-40pxr large:leading-44pxr text-white font-bold drop-shadow-md uppercase tracking-wide ${BonVivantFont.className}`}
              >
                {text}
              </Text>
            </SlideUp>
          ))}
        </Flex>

        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Flex className="text-white text-15pxr leading-18pxr mt-2 mb-5 text-center">
            <Text display="block" className={`drop-shadow-sm font-medium ${BonVivantFont.className}`}>
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </Text>
            {recipient && (
              <Text
                as="h3"
                display="block"
                className={`${BonVivantFont.className} mt-8pxr font-bold text-xl uppercase drop-shadow-md text-white`}
              >
                {recipient}
              </Text>
            )}
          </Flex>
        </SlideUp>

      </Flex>

      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <SlideUp
          show={transitionIds.includes(TITLE.length + 1)}
          className="pointer-events-auto !w-auto"
        >
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="group flex h-14 w-14 touch-manipulation select-none items-center justify-center rounded-full border border-white/80 bg-transparent text-white shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110 hover:border-white active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label="Buka Undangan"
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none h-9 w-9 animate-pulse text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-transform duration-300 motion-reduce:animate-none group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>
        </SlideUp>
      </div>
    </div>
  );
};

export default Welcome;
