"use client";

import Image from "next/image";
import { venueData } from "../data/wedding";

 

export default function VenueSection() {
  return (
    <section className="bg-white -mt-40 flex flex-col items-center justify-start pt-8 px-8 min-h-screen">
      <div className="text-center mb-4">
        <p className="text-sm tracking-[0.15em] uppercase text-[#5C2018]">
          The celebration will take place at
        </p>
      </div>

      <div className="relative max-w-2xl w-full mb-8">
        <div className="absolute -top-2 -right-2 md:top-0 md:right-0 z-10">
          <div className="px-3 py-1.5 rounded-full shadow-md bg-[#5C2018] max-w-[160px] text-center">
            <span className="text-[9px] md:text-[10px] tracking-wide text-white leading-tight block">
              {venueData.badge}
            </span>
          </div>
        </div>

        <Image
          src={venueData.image}
          alt={venueData.title}
          width={1200}
          height={800}
          className="w-full h-auto rounded-md"
          priority
        />
      </div>

      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold lg:text-5xl tracking-wide leading-tight text-[#5C2018]">
          {venueData.title}
        </h2>
      </div>
 

      <div className="text-center mb-10">
        <p className="text-2xl md:text-3xl  tracking-wide text-[#5C2018]">
          {venueData.date}
        </p>
      </div>

      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold text-[#5C2018] handlee">
          {venueData.note}
        </p>
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