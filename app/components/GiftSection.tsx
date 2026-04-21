"use client";

import Image from "next/image";
import { giftData } from "../data/wedding";

export default function GiftSection() {
  return (
    <section className="flex flex-col items-center justify-center py-12 px-8 bg-[#f8f6f1] min-h-screen">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.2em] uppercase mb-4 text-[#5C2018]">
          {giftData.topLabel}
        </p>

        <Image
          src={giftData.image}
          alt="Gift"
          width={120}
          height={120}
          className="w-28 h-28 mx-auto mb-4 object-contain"
          priority
        />

        <h2 className="text-5xl md:text-6xl tracking-wide text-[#5C2018]">
          {giftData.title}
        </h2>
      </div>

      <div className="text-center max-w-xl mb-12">
        <p className="text-base leading-relaxed mb-6 text-[#5C2018]">
          {giftData.message}
        </p>
      </div>

      <div className="text-center mb-12">
        <p className="text-3xl md:text-4xl text-[#5C2018] handlee">
          {giftData.loveText}
        </p>
      </div>

      <div className="text-center font-serif">
        <p className="text-xs tracking-[0.2em] uppercase mb-4 text-[#5C2018]">
          {giftData.detailsLabel}
        </p>

        <div className="border-2 border-[#5C2018] px-8 py-6 inline-block">
          <p className="text-sm tracking-wide mb-2 text-[#5C2018]">
            {giftData.holder}
          </p>

          <p className="text-sm tracking-wide mb-2 text-[#5C2018]">
            {giftData.account}
          </p>

          <p className="text-sm tracking-wide text-[#5C2018]">
            {giftData.reference}
          </p>
        </div>
      </div>

      <style jsx>{`
        .handlee {
          font-family: "Handlee", cursive;
        }

        @import url("https://fonts.googleapis.com/css2?family=Handlee&display=swap");
      `}</style>
    </section>
  );
}