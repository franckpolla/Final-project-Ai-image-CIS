import React from "react";

const FastSlow = () => {
  return (
    <div className="-ml-1 mt-5 flex space-x-2 items-center">
      <div className="relative self-center bg-zinc-900 rounded-lg p-[2px] flex shadow">
        <button
          type="button"
          className="rounded-md py-1 text-xs whitespace-nowrap
      focus:outline-none px-2 relative w-1/2 disabled:cursor-not-allowed
       text-zinc-400
"
          disabled=""
        >
          slow
        </button>

        <button
          type="button"
          className="rounded-md py-1 text-xs whitespace-nowrap
      focus:outline-none px-2 relative w-1/2 
      disabled:cursor-not-allowed text-white bg-zinc-700"
          disabled=""
        >
          Fast
        </button>
      </div>
      <div className="text-xs opacity-90">Generation speed</div>
    </div>
  );
};

export default FastSlow;
