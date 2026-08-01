import React, { CSSProperties, ReactNode } from "react";

import { BonVivantFont } from "@/style/fonts";
import Text from "../Text";

interface SubtitleProps {
  children: ReactNode;
  display?: CSSProperties["display"];
  className?: string;
}

const Subtitle = ({
  children,
  display = "inline",
  className = "",
}: SubtitleProps) => {
  return (
    <Text
      style={{ display }}
      className={`${BonVivantFont.className} text-14pxr font-bold leading-20pxr medium:text-24pxr medium:leading-27pxr large:text-30pxr large:leading-34pxr whitespace-pre-line text-gray-900 ${className}`}
    >
      {children}
    </Text>
  );
};

export default Subtitle;
