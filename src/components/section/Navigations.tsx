"use client";

import React, { MouseEventHandler, ReactNode, useCallback } from "react";

import Flex from "../Flex";
// import Kakao from "../../../public/kakaoNavi.svg";
import Link from "next/link";
// import NaverMap from "../../../public/naverMap.svg";
// import TMap from "../../../public/tMap.svg";
// import GMap from "../../../public/map.png";
import Image from "next/image";

interface NavigationsProps {
  href?: string;
}

const Navigations = ({ href = "https://maps.app.goo.gl/wBG6pjtee25Q4oRW9?g_st=ic" }: NavigationsProps) => {
  return (
    <Flex
      id="navigations"
      direction="row"
      justify="flex-start"
      align="center"
      className="gap-x-8pxr"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <Image
          src="/map.png"
          alt="Map"
          width={60}
          height={60}
          className="flex-none rounded-full border border-gray-300"
        />
      </Link>
    </Flex>
  );
};

export default Navigations;
