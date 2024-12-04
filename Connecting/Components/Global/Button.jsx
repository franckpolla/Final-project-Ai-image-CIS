import React from "react";

const Button = ({ name, handleClick, category }) => {
  const baseClasses = `
    text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex 
    select-none cursor-pointer hover:brightness-110 bg-gradient-to-t
    w-fit justify-center items-center px-2.5 drop-shadow py-2.5
  `;

  const activeClasses =
    "from-indigo-900 via-indigo-900 to-indigo-800 active:scale-95 transition-all";
  const inactiveClasses = "from-zinc-600 via-zinc-600 to-zinc-600";

  let icon;
  if (name === "Reel") {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-rectangle-vertical"
      >
        <rect width="12" height="20" x="6" y="2" rx="2" />
      </svg>
    );
  } else if (name === "Youtube") {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-rectangle-horizontal"
      >
        <rect width="20" height="12" x="2" y="6" rx="2" />
      </svg>
    );
  } else if (name === "Instagram") {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-square"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${
        category === name ? activeClasses : inactiveClasses
      }`}
    >
      <span className="mr-2"> Image shape </span> {icon}
    </button>
  );
};

export default Button;
