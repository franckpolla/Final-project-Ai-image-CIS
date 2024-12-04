import React from "react";
import { FaHeart } from "../SVG";

const DOMAIN_URL = process.env.DOMAIN_URL;
console.log("domain url is", DOMAIN_URL);
const ImageCard = ({ item, setSingleID, activeUser }) => {
  console.log("this is the active user in the imageCard ", activeUser);
  console.log("this is an  item  in the imageCard ", item);
  if (item.user._id !== activeUser._id) {
    return null;
  }

  console.log("image link : ", item?.images[0]);
  return (
    <div
      key={item.createdAt}
      onClick={() => setSingleID(item?._id)}
      className="new-Card-width "
    >
      <div
        className="block relative group select-none overflow-hidden m-0.5
      border-indigo-600 cursor-pointer
      "
        style={{ transition: "opacity 250ms ease 0s", borderRadius: "5px" }}
      >
        <a className={`absolute inset-0`}>
          <div
            className="absolute inset-0 z-10 block text-zinc-100 opacity-0
      group-hover:opacity-100 pointer-events-none line-clamp px-2 pb-2 text-sm
      
      "
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0.8) 0%, rgba(0,0,0,0) 60% ,rgba(0,0,0,0)100%",
            }}
          >
            <div className="flex-shrink h-full flex items-end">
              <div className="flex flex-col">
                <p
                  className="text-sm mb-1.5 font-medium leading-snug"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.prompt.slice(0, 24)}
                  {item?.prompt.lenth > 24 ? ".." : ""}
                </p>
                <p
                  className="opacity-70 text-xs mb-1 leading-snug"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.negativePrompt.slice(0, 24)}
                  {item?.negativePrompt.lenth > 24 ? ".." : ""}
                </p>
              </div>
            </div>
          </div>
        </a>
        <div
          className="absolute top-0  right-0
        p-2 flex z-10 text-zinc-100 justify-between pointer-events-none opacity-0
        group-hover:opacity-100 transition-opacity text-sm
        "
        >
          <div className="flex flex-col space-y-2">
            {item?.likes.includes(activeUser?._id) ? (
              <button
                className="bg-zinc-900 bg-opacity-70
hover:bg-opacity-100 flex items-center justify-center
pointer-events-auto cursor-pointer active:scale-90 transition-all
rounded-lg text-lg h-10 w-10
"
              >
                <FaHeart style={{ color: "red" }} />
              </button>
            ) : (
              <button
                className="bg-zinc-900 bg-opacity-70
hover:bg-opacity-100 flex items-center justify-center
pointer-events-auto cursor-pointer active:scale-90 transition-all
rounded-lg text-lg h-10 w-10
"
              >
                <FaHeart />
              </button>
            )}
            <button
              className="bg-zinc-900 bg-opacity-70
hover:bg-opacity-50 flex items-center justify-center
pointer-events-auto cursor-pointer  transition-opacity
rounded-lg text-lg h-10 w-10
"
            >
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
                class="lucide lucide-info"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </button>
          </div>
        </div>

        <img
          className="pointer-events-none  md:w-96 md:h-56"
          src={`http://localhost:3001/uploads/${item?.images[0]}`}
          alt="ai_images"
        />
      </div>
    </div>
  );
};

export default ImageCard;
