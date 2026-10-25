import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../CommonComponents/Container";
import music from "../../assets/music.png";

// শুরুর সময়: ৫ দিন ২৩ ঘণ্টা ৫৯ মিনিট ৩৫ সেকেন্ড
const START_SECONDS = 5 * 86400 + 23 * 3600 + 59 * 60 + 35;

const pad = (n) => String(n).padStart(2, "0");

const MusicExperience = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(START_SECONDS);

  // প্রতি সেকেন্ডে এক করে কমবে, শূন্য হলে আবার শুরু থেকে
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? START_SECONDS : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ডিজাইনের ক্রম অনুযায়ী: Hours, Days, Minutes, Seconds
  const units = [
    { label: "Hours", value: Math.floor((timeLeft % 86400) / 3600) },
    { label: "Days", value: Math.floor(timeLeft / 86400) },
    { label: "Minutes", value: Math.floor((timeLeft % 3600) / 60) },
    { label: "Seconds", value: timeLeft % 60 },
  ];

  return (
    <div>
      <Container>
        <div className="bg-black text-white rounded-sm overflow-hidden my-16 lg:mt-45 lg:mb-18">
          <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-0 px-6 sm:px-10 lg:pl-14 lg:pr-0 py-10 lg:py-0 lg:h-125">
            {/* বাঁ দিকের লেখা */}
            <div>
              <h2 className="font-semibold text-[#00FF66]">Categories</h2>

              <h3 className="font-Inter text-3xl sm:text-4xl lg:text-[48px] font-semibold leading-snug lg:leading-15 tracking-[0.04em] my-6 lg:my-8 max-w-110.75">
                Enhance Your Music Experience
              </h3>

              {/* গোল countdown */}
              <div className="flex flex-wrap gap-3 sm:gap-6">
                {units.map((unit) => (
                  <div
                    key={unit.label}
                    className="w-15.5 h-15.5 rounded-full bg-white text-black flex flex-col items-center justify-center"
                  >
                    <span className="font-semibold leading-tight">
                      {pad(unit.value)}
                    </span>
                    <span className="text-[11px] leading-tight">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <button
  onClick={() => navigate("/products?category=mobile-accessories")}
  className="mt-8 lg:mt-10 px-12 py-4 bg-[#00FF66] rounded-sm text-white font-medium cursor-pointer hover:opacity-90 transition-opacity duration-200"
>
  Buy Now!
</button>
            </div>

            {/* ডান দিকের ছবি */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={music}
                alt="Music speaker"
                className="w-full max-w-md lg:max-w-none object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MusicExperience;