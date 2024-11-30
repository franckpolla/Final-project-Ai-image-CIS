import React from "react";
import { LOG_OUT_USER } from "../../Utils/index.js";
import { IoLogInOutline } from "../SVG/index.js";

const Setting = ({ activeUser }) => {
  return (
    <div
      className="w-64 bg-zinc-800 z-50 fixed right-0 top-5 rounded-md drop-shadow shadow text-sm flex flex-col items-start overflow-hidden border border-zinc-700 sliderDownAndFade divide-y divide-zinc-700"
      style={{ marginRight: "1rem", marginTop: "2rem" }}
    >
      <div className="px-4 py-2 bg-zinc-700 bg-opacity-50 w-full">
        <div className="flex items-center">
          <div className="rounded-full h-8 px-2 flex-shrink-0 w-auto flex items-center justify-center bg-zinc-800 mr-2">
            <p>{activeUser?.username.toLowerCase()}</p>
          </div>
        </div>
        <span className="text-center flex justify-center items-center font-medium truncate">
          {activeUser?.email}
        </span>
        <a className="w-full px-4 gap-1 py-2 hover:bg-zinc-700 flex text-yellow-600 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-coins"
            color="yellow"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
            <path d="M7 6h1v4" />
            <path d="m16.71 13.88.7.71-2.82 2.82" />
          </svg>{" "}
          Credit left &nbsp; &nbsp; {activeUser?.credit}
        </a>
        <hr />
        <a
          className="w-full px-4 py-2 hover:bg-zinc-700 flex justify-center"
          href="/account"
        >
          Buy Credit
        </a>
        <hr />
        <button
          className="w-full flex gap-4 text-center justify-center items-center px-4 py-2 hover:bg-zinc-700"
          onClick={() => LOG_OUT_USER()}
        >
          Sign Out
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-log-in"
            color="red"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" x2="3" y1="12" y2="12" />
          </svg>
        </button>
        <hr />
      </div>
    </div>
  );
};

export default Setting;
