"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Account from "./Account";
import Arcodion from "../Arcodion";
import FooterSection from "./FooterSection";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";
import SectionDivider from "../SectionDivider";

const TITLE = ["Gift For", "Wedding Ceremony"];

const AccountSection = ({ onDone }: { onDone: () => void }) => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const [startTransition, setStartTransition] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;

    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 200);
  useIsInView(ref, () => setStartTransition(true));

  useEffect(() => {
    if (!startTransition) return;

    const intervalId = setInterval(() => {
      setTransitionIds((prev) => {
        if (prev.length > TITLE.length + 2) {
          clearInterval(intervalId);
          return prev;
        }

        return prev.concat(prev.length);
      });
    }, 400);

    return () => clearInterval(intervalId);
  }, [startTransition]);

  useEffect(() => {
    if (transitionIds.includes(TITLE.length + 2)) {
      onDone();
    }
  }, [transitionIds, onDone]);

  return (
    <>
      <section
        ref={ref}
        id="account-section"
        className="w-full bg-gradient-to-b from-white via-[#edf3fc] to-[#e6eefa] px-24pxr pb-8 pt-4"
      >
        <div className="text-center">
          {TITLE.map((title, i) => (
            <SlideUp key={title} show={transitionIds.includes(i)}>
              <Title>{title}</Title>
            </SlideUp>
          ))}
        </div>
        <Spacing size={20} />
        <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
          <Arcodion>
            <Arcodion.Header className="cursor-pointer w-full py-21.5pxr border-t border-gray-300 text-gray-900 font-bold">
              <Text className="text-gray-900 font-bold text-16pxr">Nomor Rekening Mempelai Wanita</Text>
              <Arcodion.Arrow />
            </Arcodion.Header>
            <Arcodion.Content>
              <Account
                name="TUTIE ALAWIYAH"
                bankInfo={{
                  bankName: "BCA",
                  accountNumber: "4620945698",
                }}
              />
              <Spacing size={1} />
            </Arcodion.Content>
          </Arcodion>
        </SlideUp>
        <Spacing size={20} />
        <SlideUp show={transitionIds.includes(TITLE.length + 1)} className="w-full">
          <Arcodion>
            <Arcodion.Header className="cursor-pointer w-full py-21.5pxr border-t border-gray-300 text-gray-900 font-bold">
              <Text className="text-gray-900 font-bold text-16pxr">Nomor Rekening Mempelai Pria</Text>
              <Arcodion.Arrow />
            </Arcodion.Header>
            <Arcodion.Content>
              <Account
                name="MUHAMMAD RAFLI ANDREANSYAH"
                bankInfo={{
                  bankName: "Mandiri",
                  accountNumber: "1390032346409",
                }}
              />
              <Spacing size={1} />
            </Arcodion.Content>
          </Arcodion>
        </SlideUp>
      </section>
      <div className="w-full h-16 bg-gradient-to-b from-[#e6eefa] to-black" />
      <SectionDivider variant="dark" className="bg-black py-4 my-0" />
      <SlideUp show={transitionIds.includes(TITLE.length + 2)}>
        <FooterSection />
      </SlideUp>
    </>
  );
};

export default AccountSection;
