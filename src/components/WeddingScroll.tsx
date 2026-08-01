"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AccountSection from "./section/AccountSection";
import AddressSection from "./section/AddressSection";
import BlockPintch from "./BlockPintch";
import GallerySection from "./section/GallerySection";
import Spacing from "./Spacing";
import Welcome from "./welcome/Welcome";
import StorySection from "./section/StorySection";
import CalendarSection from "./section/CalendarSection";
import IntroduceSection from "./section/IntroduceSection";

import SectionDivider from "./SectionDivider";

const WeddingScroll = () => {
  const [visitedWelcome, setVisitedWelcome] = useState(false);
  const [visitedAll, setVisitedAll] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (visitedAll) {
      document.body.style.overflow = "auto";
    } else if (!visitedWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visitedWelcome, visitedAll]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Play audio when visitedWelcome is true (user clicks Buka Undangan)
  useEffect(() => {
    if (visitedWelcome && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
    }
  }, [visitedWelcome]);

  // Pause when tab hidden, resume when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (visitedWelcome && audioRef.current && audioRef.current.paused) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [visitedWelcome]);

  const handlePlayPauseMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Failed to play audio:", error);
          });
      }
    }
  };

  return (
    <BlockPintch>
      {/* Floating Music Control Button - Visible after opening invitation */}
      {visitedWelcome && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[28.125rem] pointer-events-none px-4 flex justify-end z-[9999]">
          <button
            onClick={handlePlayPauseMusic}
            aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
            className="pointer-events-auto bg-white/30 backdrop-blur-md shadow-lg p-1 rounded-full flex items-center justify-center border border-white/40 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src={isPlaying ? "/pause.png" : "/play.png"}
              alt={isPlaying ? "Pause" : "Play"}
              width={40}
              height={40}
            />
          </button>
        </div>
      )}

      <main
        suppressHydrationWarning
        className="w-full absolute min-h-screen overflow-x-hidden flex flex-col max-w-[28.125rem] right-2/4 scroll-smooth"
        style={{ transform: `translate(50%)` }}
      >
        {/* <GoogleAnalytics trackingId="G-3F9MPE4K7V" /> */}
        <audio ref={audioRef} src="/audio/backsound-main.mp3" loop />
        <section id="scroll-container" className="relative w-full h-full">
          {!visitedWelcome && (
            <section className="absolute top-0 left-0 w-full h-full z-10">
              <Welcome onNext={() => setVisitedWelcome(true)} />
            </section>
          )}
          <IntroduceSection visitedWelcome={visitedWelcome} />
          <SectionDivider />
          <StorySection visitedWelcome={visitedWelcome} />
          <SectionDivider />
          <AddressSection />
          <SectionDivider />
          <CalendarSection />
          <SectionDivider />
          <GallerySection />
          <SectionDivider />
          <AccountSection onDone={() => setVisitedAll(true)} />
        </section>
      </main>
    </BlockPintch>
  );
};

export default WeddingScroll;
