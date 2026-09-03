"use client";

import "swiper/css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import FadeIn from "../FadeIn";
import Image from "next/image";
import ImageDetails from "../ImageDetails";
import ProgressBar from "./ProgressBar";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["Gallery"];


const getGalleryImageLoader = (number: number) => {
  return `/gallery/gallery_${number < 10 ? `${number}` : number}.jpeg`;
};
const IMAGES = Array.from({ length: 10 }, (_, i) => ({
  url: getGalleryImageLoader(i + 1),
}));

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [swiper, setSwiper] = useState<SwiperClass>();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;

    const target = document.getElementById(`small-image-${selectedIndex}`);
    if (!target) return;

    const slider = sliderRef.current;
    const targetWidth = target.offsetWidth;
    const targetLeft = target.offsetLeft;
    const targetCenter = targetLeft + targetWidth / 2;
    const sliderWidth = slider.offsetWidth;
    const sliderCenter = sliderWidth / 2;

    slider.scrollTo({
      left: targetCenter - sliderCenter,
      behavior: "smooth",
    });
  }, [selectedIndex]);

  const handleTransition = useCallback(() => {
    setTransitionIds((prev) => prev.concat(prev.length));
  }, []);

  const { isInView } = useIsInView(ref, handleTransition);

  const progressPercent = useMemo(
    () => ((selectedIndex + 1) / IMAGES.length) * 100,
    [selectedIndex]
  );

  return (
    <>
      <section ref={ref} id="gallery-section" className="w-full">
        <div className="text-center">
          {/* {TITLE.map((title, i) => (
            <SlideUp key={title} show={transitionIds.includes(i)}>
              <Title>{title}</Title>
            </SlideUp>
          ))} */}
          <SlideUp className="w-full px-24pxr" show={transitionIds.includes(0)}>
            <Title>Gallery</Title>
          </SlideUp>
        </div>

        <Spacing size={10} />

        <FadeIn show={isInView}>
          <div className="w-full px-24pxr rounded-lg" suppressHydrationWarning>
            {isMounted ? (
              <Swiper
                loop
                initialSlide={selectedIndex}
                slidesPerView={1}
                onSlideChange={(slider) => setSelectedIndex(slider.realIndex)}
                onSwiper={(swiper) => setSwiper(swiper)}
                speed={400} // Reducing speed for faster transitions
              >
                {IMAGES.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-full cursor-pointer rounded-xl"
                      alt="selected-image"
                      src={image.url}
                      width={764}
                      height={1146}
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVisibleModal(true);
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full aspect-[764/1146] bg-gray-100 rounded-xl animate-pulse" />
            )}
          </div>
          <Spacing size={16} />
          <div className="w-full px-24pxr">
            <ProgressBar width={`${progressPercent}%`} />
          </div>

          <Spacing size={16} />
          <div
            ref={sliderRef}
            className="flex flex-row gap-1 overflow-x-auto px-24pxr rounded-lg"
          >
            {IMAGES.map((image, index) => (
              <div
                id={`small-image-${index}`}
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  swiper?.slideToLoop(index);
                }}
                className="relative cursor-pointer w-20 h-30 flex-none rounded-lg"
              >
                <Image
                  quality={100}
                  loading="lazy"
                  key={index}
                  alt="preview"
                  src={image.url}
                  width={120}
                  height={180}
                />
                <div
                  className="w-full h-full absolute left-0 top-0"
                  style={
                    index === selectedIndex
                      ? { boxShadow: `0 0 0 2px #000 inset` }
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {visibleModal && (
        <ImageDetails
          onSlideChange={(index) => {
            swiper?.slideToLoop(index);
          }}
          selectedIndex={selectedIndex}
          isOpen={visibleModal}
          onClose={() => {
            setVisibleModal(false);
          }}
          images={IMAGES}
        />
      )}
    </>
  );
};

export default GallerySection;
