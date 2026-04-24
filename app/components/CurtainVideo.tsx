"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function CurtainVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource("/videos/index.m3u8");
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = "/videos/index.m3u8";
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  );
}