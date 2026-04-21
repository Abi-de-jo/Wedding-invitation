"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import VenueSection from "./components/VenueSection";
import GiftSection from "./components/GiftSection";
import RSVPSection from "./components/RSVPSection";
import ThankYouSection from "./components/ThankYouSection";

const CurtainReveal = dynamic(() => import("./components/CurtainReveal"), {
  ssr: false,
});

const ScratchReveal = dynamic(() => import("./components/ScratchCircle"), {
  ssr: false,
});

const CountdownSection = dynamic(
  () => import("./components/CountdownSection"),
  { ssr: false }
);

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  const [scratchDone, setScratchDone] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const endedRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const startAudio = async () => {
      if (startedRef.current) return;

      try {
        await audio.play();
        startedRef.current = true;
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("click", startAudio, { once: true });
    window.addEventListener("touchstart", startAudio, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };
  }, []);

  useEffect(() => {
    if (!scratchDone) return;

    const target = document.getElementById("thank-you-end");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || endedRef.current) return;

        endedRef.current = true;

        const audio = audioRef.current;
        if (!audio) return;

        let volume = audio.volume;

        const fade = setInterval(() => {
          volume -= 0.05;

          if (volume <= 0) {
            audio.volume = 0;
            audio.pause();
            clearInterval(fade);
          } else {
            audio.volume = volume;
          }
        }, 150);
      },
      {
        threshold: 0.7,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [scratchDone]);

  if (!mounted) return null;

  return (
    <main className="w-full overflow-x-hidden">
      <section
        className={`min-h-screen ${
          curtainDone ? "overflow-visible" : "overflow-hidden"
        }`}
      >
        <CurtainReveal onComplete={() => setCurtainDone(true)}>
          <Hero />
        </CurtainReveal>
      </section>

      {curtainDone && (
        <section
          className={`min-h-screen ${
            scratchDone ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          <ScratchReveal onAllScratched={() => setScratchDone(true)} />
        </section>
      )}

      {scratchDone && (
        <>
          <CountdownSection />
          <VenueSection />
          <MenuSection />
          <GiftSection />
          <RSVPSection />

          <div id="thank-you-end">
            <ThankYouSection />
          </div>
        </>
      )}
    </main>
  );
}