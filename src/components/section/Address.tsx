import React, { ReactNode } from "react";
import { BonVivantFont } from "@/style/fonts";

import Text from "../Text";

const Address = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <>
      <Text
        display="block"
        as="h4"
        className={`text-24pxr font-bold ${BonVivantFont.className} mb-2 whitespace-pre-line text-18pxr leading-25pxr text-gray-900`}
      >
        {title}
      </Text>
      <Text
        display="block"
        className="whitespace-pre-line text-14pxr leading-24pxr text-gray-800 font-medium"
      >
        {desc}
      </Text>
    </>
  );
};

export default Address;
