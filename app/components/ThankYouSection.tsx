"use client";

import { thankYouData } from "../data/wedding";

export default function ThankYouSection() {
  return (
    <section className="py-12 bg-[#f8f6f1] flex flex-col items-center justify-center px-6 min-h-screen">
      <div className="relative w-full max-w-sm md:max-w-md">
        <div className="relative rounded-3xl p-6 md:p-8 bg-[#5C2018] shadow-xl">
          <div
            className="relative bg-white rounded-2xl py-12 px-8 md:py-16 md:px-10"
            style={{
              clipPath: `
                polygon(
                  0% 8%, 4% 4%, 8% 0%, 15% 2%, 22% 0%, 29% 2%, 36% 0%,
                  43% 2%, 50% 0%, 57% 2%, 64% 0%, 71% 2%, 78% 0%, 85% 2%,
                  92% 0%, 96% 4%, 100% 8%, 98% 15%, 100% 22%, 98% 29%,
                  100% 36%, 98% 43%, 100% 50%, 98% 57%, 100% 64%, 98% 71%,
                  100% 78%, 98% 85%, 100% 92%, 96% 96%, 92% 100%, 85% 98%,
                  78% 100%, 71% 98%, 64% 100%, 57% 98%, 50% 100%, 43% 98%,
                  36% 100%, 29% 98%, 22% 100%, 15% 98%, 8% 100%, 4% 96%,
                  0% 92%, 2% 85%, 0% 78%, 2% 71%, 0% 64%, 2% 57%, 0% 50%,
                  2% 43%, 0% 36%, 2% 29%, 0% 22%, 2% 15%
                )
              `,
            }}
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl mb-6 text-[#5C2018] handlee">
                {thankYouData.title}
              </h2>

              <p className="text-sm md:text-base leading-relaxed mb-6 text-[#5C2018]">
                {thankYouData.message}
              </p>

              <p className="text-2xl md:text-3xl text-[#5C2018] handlee">
                {thankYouData.names}
              </p>
            </div>
          </div>
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