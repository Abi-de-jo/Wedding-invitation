"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function PremiereCurtain({
  children,
  onComplete,
}: {
  children: React.ReactNode;
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<"idle" | "playing" | "open">("idle");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "auto" : "hidden";

    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      document.body.style.overflow = "auto";
      audioRef.current?.pause();
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;

    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource("/videos/index.m3u8");
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = "/videos/index.m3u8";
      video.play().catch(() => {});
    }

    return () => {
      hls?.destroy();
    };
  }, [phase]);

  const handleClick = async () => {
    if (phase !== "idle") return;

    setPhase("playing");

    try {
      await audioRef.current?.play();
    } catch {}

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

const handleVideoEnd = () => {
  const video = videoRef.current;

  if (video) {
    video.pause();
  }

  setTimeout(() => {
    setPhase("open");
    onComplete?.();
  }, 180);
};

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f8f6f1]">
      {phase === "open" && (
        <>
          <div className="absolute inset-0 z-10">
            <img
              src="/curtain-open.jpg"
              alt="Curtain Open"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-20"
          >
            {children}
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            key="closed"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30"
          >
            <img
              src="/curtain.jpg"
              alt="Curtain Closed"
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "playing" && (
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
           onEnded={handleVideoEnd}
          className="absolute inset-0 z-50 h-full w-full object-cover"
        />
      )}

      {phase === "idle" && (
        <>
          <motion.button
            onClick={handleClick}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute inset-0 z-40 m-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-white/15 backdrop-blur-md shadow-2xl"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
              <path d="M9 11.5V6a1 1 0 0 1 2 0v3a1 1 0 0 1 2 0v1a1 1 0 0 1 2 0v1a1 1 0 0 1 2 0v3.5c0 2.5-1.5 4.5-4 4.5H11C8.8 19 7 17.2 7 15v-1.5a1.5 1.5 0 0 1 2-1.4V11.5z" />
            </svg>

            <motion.span
              className="absolute inset-0 rounded-full border border-white/40"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
          </motion.button>

          <p className="absolute top-[60%] left-1/2 z-40 -translate-x-1/2 text-sm tracking-[0.25em] uppercase text-center text-white">
            Click to Reveal
          </p>
        </>
      )}
    </div>
  );
}