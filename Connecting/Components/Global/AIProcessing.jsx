import React, { useState, useEffect } from "react";
import { LoginLogo } from "../SVG";

const AIProcessing = ({ progress = 0, message = "AI Processing..." }) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smoothly animate progress updates
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        return prev + Math.sign(diff) * Math.min(Math.abs(diff), 2);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div
      className=" fixed inset-0 bg-zinc-900 bg-opacity-40 z-50 flex items-center justify-center"
      style={{ pointerEvents: "auto" }}
    >
      <div
        style={{
          maxWidth: "330px",
          width: "100%",
          maxHeight: "85vh",
        }}
        className="bg-zinc-800 shadow-xl rounded-2xl z-50 px-8 py-8 text-sm border border-zinc-700"
      >
        <div className="flex flex-col text-zinc-200 text-center items-center">
          <LoginLogo />

          {/* Optional Loading Indicator */}
          <div className="new_loader JS_on mt-4">
            <span className="binary"> </span>
            <span className="binary"> </span>
          </div>
          <div className="w-full mt-4">
            {/* Progress Bar */}
            <div className="bg-zinc-700 h-2 rounded-full overflow-hidden mb-2">
              <div
                className="bg-blue-500 h-full transition-all duration-200 ease-out"
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            {/* Progress Text */}
            <div className="flex justify-between text-xs text-zinc-400">
              <span>{message}</span>
              <span>{Math.round(displayProgress)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProcessing;
