"use client";

import { motion } from "motion/react";
import { weddingData } from "../data/wedding";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f8f6f1]">
      
      <img
        src="/curtain-open.jpg"
        alt="Wedding Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 " />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="flex flex-col items-center text-center max-w-[78%] md:max-w-[52%]">
          
          <p className="tracking-[0.35em] w-34 text-center uppercase text-[7px] md:text-[11px] mb-5 text-[#5C2018] font-light leading-relaxed">
            {weddingData.inviteLine}
          </p>

          <h1 className="text-xl md:text-4xl lg:text-5xl leading-none text-[#5C2018] font-serif italic">
            {weddingData.groom}
          </h1>

          <span className="text-2xl md:text-3xl my-1 text-[#5C2018] font-serif italic">
            &
          </span>

          <h1 className="text-xl md:text-4xl lg:text-5xl mb-6 leading-none text-[#5C2018] font-serif italic">
            {weddingData.bride}
          </h1>

          <p className="text-[10px] md:text-xs w-55 tracking-[0.18em] uppercase leading-6 text-[#5C2018] max-w-[95%]">
            {weddingData.description}
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <div className="flex flex-col items-center">
          <p className="text-[10px] tracking-[0.28em] uppercase mb-2 text-[#5C2018]">
            Scroll
          </p>

          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5C2018"
            strokeWidth="1.4"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}