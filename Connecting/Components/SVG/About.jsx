import React from "react";

const About = () => {
  return (
    <div className="relative flex items-center justify-center text-xl sm:hidden w-full">
      <div
        className="absolute w-full"
        style={{
          borderBottom: "2.5px solid transparent",
          bottom: "-17px",
        }}
      />
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2a4 4 0 1 1-4 4 4 4 0 0 1 4-4zm0 7c-5.33 0-8 2.67-8 8v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-5.33-2.67-8-8-8z" />
      </svg>
    </div>
  );
};

export default About;
