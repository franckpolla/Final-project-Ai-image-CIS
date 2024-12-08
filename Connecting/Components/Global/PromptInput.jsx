import React, { useState } from "react";
import { AILogo, Dimensions } from "../SVG/index.js";
import ActiveModel from "./ActiveModel.jsx";
import { FastSlow } from "../index.js";

const PromptInput = ({ promptv3, setV3style, setPromptv3 }) => {
  const [AISizeStyleV3, setAISizeStyleV3] = useState("1792x1024");

  return (
    <div className="w-full mt-[5px] md:max-w-[350px]">
      <div className="relative rounded-lg ">
        <div className="px-2 py-2">
          <div className="text-xl text-white  opacity-100 select-none">
            Select features
          </div>
          <div className="flex space-x-2 px-2">
            <div
              className="text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap
            flex-1 flex select-none cursor-pointer hover:brightness-100 bg-gradient-to-t
            drop-shadow items-center justify-center px-2.5 py-2.5 w-fit-content active:scale-95
            transition-all from-indigo-900 via-indigo-900 to-indigo-800
            "
            >
              <AILogo /> &nbsp; Dall-e-V3
            </div>
          </div>
          {
            <ActiveModel
              size1="1024x1792"
              size2="1792x1024"
              size3="1024x1024"
              value={promptv3}
              updateState={setPromptv3}
              addClass={AISizeStyleV3}
              updateClass={setAISizeStyleV3}
              setV3style={setV3style}
            />
          }
          <FastSlow />
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
