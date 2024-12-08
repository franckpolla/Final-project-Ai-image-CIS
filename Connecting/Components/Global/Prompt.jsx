import React from "react";
import Loader from "./Loader";

const Prompt = ({ promptv3, setPromptv3 }) => {
  const reload = () => {
    window.location.reload();
  };
  return (
    <div className="flex-1 min-w-0">
      <div className="flex justify-between px-2 pb-1 mt-6 md:mt-0 text-ts ">
        <p className="opacity-100 text-xl">Detail Prompt</p>
      </div>
      <div className="relative z-10 shadow bg-zinc-700 bg-opacity-60 border-x border-t border-zinc-700 rounded-xl">
        <textarea
          className="block resize-none bg-transparent overflow-y-hidden w-full rounded-xl leading-relaxed
  text-sm pl-4 pr-7 pt-2.5 pb-10 focus:outline-none focus:ring-1 focus:ring-indigo-700
  placeholder:opacity-100 rounded-b-xl border-b-0
  "
          style={{
            resize: "none",
            height: "96px !important",
          }}
          placeholder="Your prompt goes here..."
          onChange={(e) => {
            setPromptv3({ ...promptv3, prompt: e.target.value });
          }}
        />
        <div className="border border-transparent">
          <div className="-mt-[31px] px-[10px] pb-[7px] w-full">
            <div
              className="flex flex-wrap gap-1"
              style={{
                position: "relative",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
            }}
          />
        </div>
      </div>
      <p className="opacity-100 text-x2l pl-2 pb-1 mt-4">Main Prompt</p>
      <textarea
        className="block resize-none shadow  overflow-y-hidden w-full
         bg-zinc-700 bg-opacity-60 border border-zinc-700 rounded-xl leading-relaxed
          text-sm px-4 py-2.5
        focus:ring-1 focus:ring-indigo-700
  placeholder:opacity-100 rounded-b-xl border-b-0 border-r-indigo-700"
        style={{
          height: "45px !important",
        }}
        placeholder="Enter the main prompt here... "
        onChange={(e) => {
          setPromptv3({ ...promptv3, negativePrompt: e.target.value });
        }}
      />
    </div>
  );
};

export default Prompt;
