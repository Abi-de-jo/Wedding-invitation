"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { menuData } from "../data/wedding";

export default function MenuSection() {
  return (
    <section className="flex flex-col -mt-30 items-center justify-center py-8 px-4 bg-[#faf8f5] min-h-screen">
      <div className="relative w-full max-w-md md:max-w-lg">
        <Image
          src={menuData.image}
          alt="Wedding Menu"
          width={700}
          height={1100}
          className="w-full h-auto"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] -mt-8">
          {menuData.sections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="text-center mb-5"
            >
              <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-1 text-[#5C2018]">
                {item.heading}
              </h3>

              <p className="text-[10px] md:text-xs text-[#5C2018]">
                {item.line1}
              </p>

              <p className="text-[10px] md:text-xs italic text-[#5C2018]">
                {item.line2}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-[#5C2018] handlee">
              {menuData.footer}
            </p>
          </motion.div>
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