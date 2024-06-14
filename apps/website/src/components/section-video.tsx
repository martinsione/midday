"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@midday/ui/button";
import { cn } from "@midday/ui/cn";
import { Icons } from "@midday/ui/icons";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});

export function SectionVideo() {
  const playerRef = useRef();
  const [isPlaying, setPlaying] = useState(false);
  const [isMuted, setMuted] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }

    setPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  return (
    <motion.div
      className="flex flex-col justify-center container pb-20"
      onViewportEnter={() => {
        if (!isPlaying && isDesktop) {
          setTimeout(() => {
            playerRef.current?.play();
            setPlaying(true);
          }, 2000);
        }
      }}
      onViewportLeave={() => {
        playerRef.current?.pause();
        setPlaying(false);
      }}
    >
      <div className="relative">
        {isPlaying && (
          <div
            className={cn(
              "absolute md:top-12 md:right-12 top-4 right-4 space-x-4 items-center justify-center opacity-0 z-30 transition-all",
              isPlaying && "opacity-100"
            )}
          >
            <Button
              size="icon"
              className="rounded-full size-10 md:size-14"
              onClick={toggleMute}
            >
              <Icons.Mute size={24} />
            </Button>
          </div>
        )}

        {!isPlaying && (
          <div
            className={cn(
              "absolute md:top-12 md:right-12 top-4 right-4 space-x-4 items-center justify-center opacity-0 z-30 transition-all",
              !isPlaying && "opacity-100"
            )}
          >
            <Button
              size="icon"
              className="rounded-full size-10 md:size-14"
              onClick={togglePlay}
            >
              <Icons.Play size={24} />
            </Button>
          </div>
        )}

        <ReactHlsPlayer
          onClick={togglePlay}
          src="https://customer-oh6t55xltlgrfayh.cloudflarestream.com/306702a5d5efbba0e9bcdd7cb17e9c5a/manifest/video.m3u8"
          autoPlay={false}
          poster="https://pub-842eaa8107354d468d572ebfca43b6e3.r2.dev/poster.webp"
          playerRef={playerRef}
          className="w-full"
          loop
          muted={isMuted}
        />
      </div>
    </motion.div>
  );
}
