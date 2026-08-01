import React, { CSSProperties, ReactNode } from "react";

import { BonVivantFont } from "@/style/fonts";
import Text from "../Text";

interface TitleProps {
  children: ReactNode;
  display?: CSSProperties["display"];
  className?: string;
}

const Title = ({
  children,
  display = "inline",
  className = "",
}: TitleProps) => {
  return (
    <Text
      style={{ display }}
      className={`${BonVivantFont.className} text-24pxr leading-45pxr medium:text-34pxr medium:leading-37pxr large:text-40pxr large:leading-44pxr whitespace-pre-line text-gray-900 font-bold ${className}`}
    >
      {children}
    </Text>
  );
};

export default Title;
