import React, { useState } from "react";
import {
  FaInstagram,
  BsCameraReelsFill,
  AILogo,
  Dimensions,
} from "../SVG/index.js";

const ActiveModel = ({
  size1,
  size2,
  size3,
  value,
  updateState,
  addClass,
  updateClass,
}) => {
  const [V3Style, setV3style] = useState("vivid");

  return (
    <>
      <div className="flex flex-row ">
        <div className="flex flex-col lg:flex-row md:flex-row ">
          <div className="flex gap-4 flex-col lg:flex-row md:flex-row mt-4 mx-4">
            <div className="border p-2 rounded-lg ">
              <div className="mt-3 flex flex-col ">
                <div className="select-none opacity-90 text-xs flex items-center justify-start ">
                  <Dimensions />
                  <p>Image Style Type</p>
                </div>
              </div>

              <div className="flex space-x-2 px-2">
                <div
                  onClick={() => {
                    updateState({ ...value, style: "vivid" });
                    setV3style("vivid");
                  }}
                  className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex
            select-none cursor-pointer hover:brightness-110 bg-gradient-to-t
            drop-shadow-sm items-center justify-center px-5 ${
              V3Style == "vivid"
                ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                : " from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
            }`}
                >
                  <AILogo /> &nbsp; {"vivid"}
                </div>
                <button
                  onClick={() => {
                    updateState({ ...value, style: "natural" });
                    setV3style("natural");
                  }}
                  className={`text-xs rounded-md overflow-hidden sm:text-sm group mt-4 whitespace-nowrap flex-1 flex
            select-none cursor-pointer hover:brightness-110 bg-gradient-to-t
            drop-shadow-sm items-center justify-center px-7 ${
              V3Style == "natural"
                ? "py-5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                : " from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
            }`}
                >
                  <AILogo /> &nbsp; {"natural"}
                </button>
              </div>
            </div>

            <div className="border p-2 rounded-lg ">
              <div className="flex flex-col">
                <div className="mt-3 flex flex-col ">
                  <div className="select-none opacity-90 text-xs flex items-center justify-start">
                    <Dimensions />
                    <p>Image Size</p>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="flex space-x-2 px-2">
                  <div
                    onClick={() => {
                      updateState({ ...value, size: size1 });
                      updateClass(size1);
                    }}
                    className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex
            select-none cursor-pointer hover:brightness-110 bg-gradient-to-t
            drop-shadow-sm items-center justify-center px-1 ${
              addClass == size1
                ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                : " from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
            }`}
                  >
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
                    </svg>{" "}
                    &nbsp; &nbsp;
                    {size1}
                  </div>
                  <button
                    onClick={() => {
                      updateState({ ...value, size: size2 });
                      updateClass(size2);
                    }}
                    className={`text-xs rounded-md sm:text-sm overflow-hidden group mt-4 whitespace-nowrap flex-1 flex
            select-none cursor-pointer hover:brightness-110 bg-gradient-to-t
            drop-shadow-sm items-center justify-center px-1 ${
              addClass == size2
                ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                : " from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
            }`}
                  >
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
                    </svg>{" "}
                    &nbsp; {size2}
                  </button>
                </div>
                <div className="flex space-x-2 px-2">
                  <div
                    onClick={() => {
                      updateState({ ...value, size: size3 });
                      updateClass(size3);
                    }}
                    className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex
            select-none cursor-pointer hover:brightness-110 bg-gradient-to-t
            drop-shadow-sm items-center justify-center px-1 ${
              addClass == size3
                ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                : " from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
            }`}
                  >
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
                    </svg>{" "}
                    &nbsp; &nbsp;
                    {size3}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveModel;
