import React, { Fragment } from "react";

import Glare from "../../public/glare/glare_white.svg";
import Text from "./Text";

const BANNERS = Array.from({ length: 3 }).map(
  () => "05 September 2026, 09.00 WIB - Selesai"
);
const RollingBanner = () => {
  return (
    <div
      id="rolling-banner"
      className="wrapper overflow-hidden will-change-auto rounded-xl"
    >
      <div className="slide-container bg-gray-100 text-black py-10pxr text-14pxr leading-24pxr will-change-auto">
        <div className="slide-wrapper will-change-auto">
          <div className="slide-original will-change-auto">
            {BANNERS.map((banner, i) => (
              <Fragment key={i}>
                <Glare className="flex-none inline" />
                <Text>{banner}</Text>
              </Fragment>
            ))}
          </div>
          <div className="slide-clone will-change-auto">
            {BANNERS.map((banner, i) => (
              <Fragment key={i}>
                <Glare className="flex-none inline" />
                <Text>{banner}</Text>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollingBanner;
