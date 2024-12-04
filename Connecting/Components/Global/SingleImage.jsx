import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver"; //library is a JavaScript library used to save files locally in the browser, which is particularly useful for downloading files from the web application to the user's device.
import {
  Close,
  Copy,
  Link,
  LinkFollow,
  Magic2,
  ArrowRight,
  ArrowRight2,
  ArrowLeft,
  Download,
  FaHeart,
  FaRegHeart,
  MdOutlineDelete,
} from "../SVG/index.js";

import {
  DISLIKE_POST,
  LIKE_POST,
  CHECK_AUTH_USER,
  GET_SINGLE_POST,
  DELETE_POST,
} from "../../Utils/index.js";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share";

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const SingleImage = ({ singleID, setSingleID }) => {
  const [like, setLike] = useState(false);
  const [postDetail, setPostDetail] = useState([]);
  const [activeUser, setActiveUser] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [reCall, setReCall] = useState(0);
  const [deletePost, setDeletePost] = useState(true);
  // First, add a new state for the URL copy button
  const [isPromptCopied, setIsPromptCopied] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  const AI_IMAGE_DOWNLOAD = (image) => {
    let url = `${DOMAIN_URL}${image}`;
    saveAs(url, `${DOMAIN}-${image}`);
  }; /// this function is used to the download
  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "prompt") {
      setIsPromptCopied(true);
      setTimeout(() => setIsPromptCopied(false), 2000);
    } else if (type === "url") {
      setIsUrlCopied(true);
      setTimeout(() => setIsUrlCopied(false), 2000);
    }
  };
  const CALLING_LIKE = async (postID) => {
    try {
      setLoader(true);
      const response = await LIKE_POST(postID);
      if (response.status === 200) {
        setLoader(false);
        setReCall(reCall + 1);
      }
    } catch (error) {
      setLoader(false);
      console.error(error.message);
    }
  };
  const CALLING_DiSLIKE = async (postID) => {
    try {
      setLoader(true);
      const response = await DISLIKE_POST(postID);
      if (response.status === 200) {
        setLoader(false);
        setReCall(reCall + 1);
      }
    } catch (error) {
      setLoader(false);
      console.error(error.message);
    }
  };

  const CALLING_USER_INFO = async (postID) => {
    try {
      if (postID) {
        const response = await GET_SINGLE_POST(postID);

        console.log("this single post ", response.post);
        if (response) {
          setPostDetail(response.post);

          setSelectedImage(`${response.post?.images[0]}`);
          console.log(" this post postdetail ", postDetail);
        }
        const user = await CHECK_AUTH_USER();
        setActiveUser(user);
        console.log("user ", user);

        if (response?.post.likes.includes(user._id)) {
          setLike(true);
        } else {
          setLike(false);
        }
      }
    } catch (error) {
      setLoader(false);
      console.error(error.message);
    }
  };

  const CALLING_DELETE = async (postID) => {
    try {
      console.log("this is the active user in the imageCard ", activeUser);

      console.log("this is the post detail ", postDetail);
      if (postDetail.user !== activeUser._id) {
        return alert("Only the Owner of this image can delete  it");
      }
      setLoader(true);
      const response = await DELETE_POST(postID);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      setLoader(false);
      console.error(error.message);
    }
  };
  useEffect(() => {
    CALLING_USER_INFO(singleID);
  }, [reCall]);

  return (
    <div
      className="singleImage-width fixed inset-0 w-screen h-screen overflow-hidden
    px-16 py-4 flex justify-center z-40 sm:z-50 bg-zinc-900 bg-opacity-80
    
    "
      style={{
        overscrollBehavior: "contain",
        minHeight: "-webkit-fill-available",
      }}
    >
      <div
        className="absolute top-0 left-0 cursor-pointer h-12 w-12 flex items-center
    justify-center text-4xl drop-shadow"
        onClick={() => setSingleID("")}
      >
        <Close />
      </div>
      <div
        className="single-scroll flex flex-col
      bg-blue-900 drop-shadow-xl overflow-hidden rounded-xl border border-zinc-700
      box-content 
      "
      >
        <div className="flex w-full h-full sel-stretch flex-col md:flex-row pb-16 md:pb-0  md:pt-0 flex-1">
          <div
            className="flex flex-shrink-0 overflow-hidden text-base px-5 flex-col
h-auto "
            style={{ height: "fit-content", width: 400 }}
          >
            <div
              className="mt-6 px-4 py-3
          bg-zinc-700 rounded-xl shadow bg-opacity-50 font-light
          flex flex-col space-y-5
          "
            >
              <p>
                <a
                  className="bg-red-500 bg-opacity-0 rounded hover:bg-opacity-40
              cursor-pointer
              "
                >
                  {postDetail?.prompt}
                </a>
              </p>
              <div className="flex text-xs font-light">
                <div className="flex flex-1 flex-row space-x-2 mr-2">
                  <button
                    className={`transition-colors duration-200 text-xs rounded-md sm:text-xs active:scale-95 transform-gpu whitespace-nowrap flex-1 flex select-none cursor-pointer hover:bg-zinc-600 bg-zinc-700 items-center justify-center shadow px-2.5 py-2 w-fit-content   ${
                      isPromptCopied ? "text-green-500" : ""
                    }`}
                    onClick={() => copyText(postDetail?.prompt, "prompt")}
                  >
                    <Copy />
                    Copy Prompt
                  </button>
                  <button
                    className={`transition-colors duration-200 text-xs rounded-md sm:text-xs active:scale-95 transform-gpu whitespace-nowrap flex-1 flex select-none cursor-pointer hover:bg-zinc-600 bg-zinc-700 items-center justify-center shadow px-2.5 py-2 w-fit-content   ${
                      isUrlCopied ? "text-green-500" : ""
                    }`}
                    onClick={() =>
                      copyText(`${DOMAIN_URL}${selectedImage}`, "url")
                    }
                  >
                    <Link />
                    Copy URL
                  </button>
                  {/* <div
                  onClick={() => copyText(`${DOMAIN_URL}${selectedImage}`)}
                  className="text-xs rounded-md sm:text-xs active:scale-95
                  transition-all transform-gpu  whitespace-nowrap
                  flex-1 flex select-none cursor-pointer
                  hover:bg-zinc-600 bg-zinc-700 items-center justify-center
                  shadow px-2.5 py-2 w-fit-content"
                >
                 
                </div> */}
                </div>
                <a
                  href="/aperture"
                  className="text-sm w-12 flex select-none
              cursor-pointer hover:bg-zinc-600 border border-zinc-700 items-center
              justify-center rounded-md shadow px-3
              "
                >
                  <LinkFollow />
                </a>
              </div>
            </div>
            <div className="flex space-x-2 px-2">
              <a
                href="/aperture"
                className="text-sm rounded-md sm:text-sm
          group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer
          hover:brightness-110 bg-gradient-to-t from-indigo-900 via-indigo-900
          to-indigo-800 drop-shadow items-center justify-center px-2.5 py-2.5 w-fit-content
          active:scale-95 transition-all
              "
              >
                <Magic2 />
                Generate new Images
              </a>
              <a
                href="/history"
                className="text-sm rounded-md sm:text-sm
          group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer
          hover:brightness-110 bg-gradient-to-t from-indigo-900 via-indigo-900
          to-indigo-800 drop-shadow items-center justify-center px-2.5 py-2.5 w-fit-content
          
              "
              >
                Explore your history
                <ArrowRight />
              </a>
            </div>
            <div
              className="md:mt-6 mt-4 opacity-80 ml-2 grid grid-cols-2 gap-2
          md:flex flex-wrap md:flex-col md:space-x-0 md:space-y-1 h-auto pb-32
          sm:pb-8"
            >
              <div>
                <div className="text-xs opacity-50">Model</div>
                <div className="text-sm"> {postDetail?.aimodel}</div>
              </div>

              <div>
                <div className="text-xs opacity-50">Image size</div>
                <div className="text-sm"> {postDetail?.size}</div>
              </div>

              <div>
                <div className="text-xs opacity-50">Quality</div>
                <div className="text-sm"> {postDetail?.quality}</div>
              </div>
              <div>
                <div className="text-xs opacity-50">Style</div>
                <div className="text-sm"> {postDetail?.style}</div>
              </div>
              {/* <div>
                <div className="text-xs opacity-50">Creator</div>
                <div className="text-sm"> {postDetail?.user}</div>
              </div> */}
              <div className="flex  flex-col">
                <h2 className="font-medium py-4"> Share on social media </h2>
                <div className="flex gap-4 ">
                  <FacebookShareButton url={`${DOMAIN_URL}${selectedImage}`}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <EmailShareButton url={`${DOMAIN_URL}${selectedImage}`}>
                    <EmailIcon size={32} round={true} />
                  </EmailShareButton>
                  <WhatsappShareButton url={`${DOMAIN_URL}${selectedImage}`}>
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                  <TwitterShareButton url={`${DOMAIN_URL}${selectedImage}`}>
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col md:flex-row">
            <div className="relative w-96 flex justify-center items-center p-4">
              {postDetail?.images?.[0] && (
                <>
                  {/* Main Image Container */}
                  <div className="relative w-full max-w-xl aspect-square md:aspect-auto lg:max-w-[600px] lg:max-h-[600px]">
                    <img
                      alt="Single Image"
                      className="w-full h-auto object-contain rounded-lg"
                      style={{
                        maxWidth: "600px", // Fixed max width for large screens
                        maxHeight: "600px", // Fixed max height for large screens
                      }}
                      src={
                        selectedImage
                          ? `${DOMAIN_URL}${selectedImage}`
                          : `${DOMAIN_URL}${postDetail.images[0]}`
                      }
                    />

                    {/* Controls Overlay */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 z-30">
                      <button
                        className="bg-zinc-900 bg-opacity-70 hover:bg-opacity-100 rounded-lg transition-all duration-200 flex items-center justify-center w-12 p-2"
                        onClick={() =>
                          like
                            ? CALLING_DiSLIKE(postDetail?._id)
                            : CALLING_LIKE(postDetail?._id)
                        }
                      >
                        {like ? (
                          <FaHeart className="text-2xl" color="red" />
                        ) : (
                          <FaRegHeart className="text-xl" />
                        )}
                      </button>

                      {deletePost && (
                        <button
                          className="bg-zinc-900 bg-opacity-70 hover:bg-opacity-100 rounded-lg transition-all duration-200 flex items-center justify-center w-12 p-2"
                          onClick={() => CALLING_DELETE(postDetail?._id)}
                        >
                          <MdOutlineDelete className="text-xl" />
                        </button>
                      )}
                    </div>

                    {/* Download Button */}
                    <div className="absolute bottom-2 right-2 z-30">
                      <button
                        onClick={() => AI_IMAGE_DOWNLOAD(selectedImage)}
                        className="bg-zinc-900 bg-opacity-70 hover:bg-opacity-100 p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center w-12 h-9"
                      >
                        <Download className="text-xl" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
