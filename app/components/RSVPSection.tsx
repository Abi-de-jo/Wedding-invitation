"use client";

import { useState } from "react";
import { rsvpData } from "../data/wedding";

export default function RSVPSection() {
  const [attendance, setAttendance] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    // try {
    //   await fetch("/api/rsvp", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name,
    //       attendance,
    //       message,
    //       createdAt: new Date(),
    //     }),
    //   });

    //   setSuccess(true);
    //   setName("");
    //   setAttendance("");
    //   setMessage("");
    // } catch (error) {
    //   console.log(error);
    // }

    console.log(name)

    setLoading(false);
  };

  return (
    <section
      id="rsvp"
      className="py-16 px-6 bg-white min-h-screen flex items-center"
    >
      <div className="max-w-xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl mb-2 text-[#5C2018] handlee">
            {rsvpData.title}
          </h2>

          <p className="text-sm text-[#5C2018]/80 mt-2">
            {rsvpData.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 md:p-8 space-y-6 bg-white/70 border border-[#5C2018]/10"
        >
          <div>
            <label className="text-xs tracking-widest uppercase mb-2 block text-[#5C2018]">
              Full Name *
            </label>

            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full h-11 px-4 rounded-xl border border-[#5C2018]/20 bg-white text-[#5C2018] outline-none"
            />
          </div>

          <div>
            <label className="text-xs tracking-widest uppercase mb-3 block text-[#5C2018]">
              Will you attend? *
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setAttendance("Yes")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm border ${
                  attendance === "Yes"
                    ? "bg-[#5C2018] text-white border-[#5C2018]"
                    : "bg-white text-[#5C2018] border-[#5C2018]/20"
                }`}
              >
                {rsvpData.yesText}
              </button>

              <button
                type="button"
                onClick={() => setAttendance("No")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm border ${
                  attendance === "No"
                    ? "bg-[#5C2018] text-white border-[#5C2018]"
                    : "bg-white text-[#5C2018] border-[#5C2018]/20"
                }`}
              >
                {rsvpData.noText}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs tracking-widest uppercase mb-2 block text-[#5C2018]">
              Message
            </label>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your wishes..."
              className="w-full px-4 py-3 rounded-xl border border-[#5C2018]/20 bg-white text-[#5C2018] outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!name || !attendance || loading}
            className="w-full rounded-xl py-4 bg-[#5C2018] text-[#faf8f5] disabled:opacity-50"
          >
            {loading ? "Submitting..." : rsvpData.buttonText}
          </button>

          {success && (
            <p className="text-center text-sm text-green-700">
              Response saved successfully ✨
            </p>
          )}
        </form>
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