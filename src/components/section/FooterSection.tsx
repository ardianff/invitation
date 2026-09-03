import { BonVivantFont } from "@/style/fonts";
import Flex from "../Flex";
// import FooterButtons from "./FooterButtons"; // Uncomment if needed
import React from "react";
import Text from "../Text";
import Image from "next/image";

const FooterSection = () => {
  return (
    <Flex
      as="section"
      direction="column"
      justify="end"
      align="center"
      className="w-full h-screen relative text-center pb-16"
    >
      <div className="absolute inset-0">
        <Image
          quality={100}
          src="/hero/hero-5.jpeg"
          fill
          sizes="(max-width: 450px) 100vw, 450px"
          alt="background"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-black/85 -z-10" />
      </div>
      <div className="flex flex-col gap-3 p-6 z-10 relative text-white items-center">
        <Text className="text-15pxr leading-24pxr text-white font-medium drop-shadow-md" display="block">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
          kami. Atas kehadiran dan doanya kami mengucapkan terimakasih
        </Text>
        <Text className="text-15pxr leading-24pxr text-white font-medium drop-shadow-md" display="block">
          Wassalamualaikum Warahmatullahi Wabarakatuh
        </Text>
        <Text
          display="inline-block"
          className={`text-24pxr leading-36pxr medium:text-32pxr medium:leading-48pxr whitespace-pre-line text-white font-bold drop-shadow-md mt-1 ${BonVivantFont.className}`}
        >
          Ardian & Anya
        </Text>
      </div>

      {/* "Made with love" text at the bottom */}
      <div className="absolute bottom-0 w-full p-4 z-10 flex items-center justify-center">
        <Text className="text-10pxr leading-25pxr mr-2 text-white/90 drop-shadow-xs">
          Made with ♡ by{" "}
          <a
            href="https://baseec.my.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline font-semibold"
          >
            Baseec
          </a>
        </Text>
      </div>
    </Flex>
  );
};

export default FooterSection;
