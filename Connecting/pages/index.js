import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { HomeLogo, BsCameraReelsFill } from "../Components/SVG/index.js";
import {
  Header,
  GetStarted,
  SingleImage,
  Button,
} from "../Components/index.js";
import Footer from "../Components/Global/Footer.jsx";
import { CHECK_AUTH_USER, GET_AI_IMAGES } from "../Utils/index.js";
import ImageCardHomePage from "../Components/Global/imageCardHomePage.jsx";

const CATEGORIES = {
  REEL: "Reel",
  INSTAGRAM: "Instagram",
  YOUTUBE: "Youtube",
};

const IMAGE_SIZES = {
  [CATEGORIES.REEL]: "1024x1792",
  [CATEGORIES.INSTAGRAM]: "1024x1024",
  [CATEGORIES.YOUTUBE]: "1792x1024",
};

const Index = () => {
  const { query } = useRouter();
  const [loader, setLoader] = useState(false);
  const [buying, setBuying] = useState();
  const [singleID, setSingleID] = useState("");
  const [category, setCategory] = useState(CATEGORIES.REEL);
  const [isHovered, setIsHovered] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [allAIImages, setAllAIImages] = useState([]);
  const [imagesByCategory, setImagesByCategory] = useState({
    [CATEGORIES.REEL]: [],
    [CATEGORIES.INSTAGRAM]: [],
    [CATEGORIES.YOUTUBE]: [],
  });

  useEffect(() => {
    if (query.CREDIT_PLAN) {
      setBuying(query.CREDIT_PLAN);
    }
  }, [query.CREDIT_PLAN]);

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    setAllAIImages(imagesByCategory[newCategory] || []);
  };

  const initializeUser = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const user = await CHECK_AUTH_USER();
        setActiveUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const initializeImages = async () => {
    try {
      setLoader(true);
      const response = await GET_AI_IMAGES();

      const categorizedImages = {
        [CATEGORIES.REEL]: [],
        [CATEGORIES.INSTAGRAM]: [],
        [CATEGORIES.YOUTUBE]: [],
      };

      response.forEach((image) => {
        switch (image.size) {
          case IMAGE_SIZES[CATEGORIES.REEL]:
            categorizedImages[CATEGORIES.REEL].push(image);
            break;
          case IMAGE_SIZES[CATEGORIES.INSTAGRAM]:
            categorizedImages[CATEGORIES.INSTAGRAM].push(image);
            break;
          case IMAGE_SIZES[CATEGORIES.YOUTUBE]:
            categorizedImages[CATEGORIES.YOUTUBE].push(image);
            break;
        }
      });

      setImagesByCategory(categorizedImages);
      setAllAIImages(categorizedImages[CATEGORIES.REEL]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([initializeUser(), initializeImages()]);
    };

    initialize();
  }, []);

  const arrayRender = [...allAIImages].reverse();

  return (
    <div>
      <Header />
      <div className="mb-[56px] sm:mb-0 sm:mt-[56px]">
        <div className="flex flex-col mb-44">
          <GetStarted />

          <div className="w-full overflow-x-hidden flex flex-col items-center py-4 mt-8">
            <div className="h-screen">
              <div className="mt-6 flex justify-center items-center">
                <p className="text-center font-thin text-sm sm:text-xl animate-pulse">
                  <HomeLogo />
                </p>
              </div>
              <div className="w-full mt-6 flex flex-col justify-center items-center">
                <h1 className="text-5xl md:text-[8rem] mt-2 font-extrabold mb-6 text-center">
                  <strong
                    className="font-extrabold"
                    style={{
                      WebkitTextFillColor: "transparent",
                      fontSize: "5rem",
                      background:
                        "linear-gradient(to left, rgb(139 92 246), rgb(217 70 239))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    AI Image Generator
                  </strong>
                </h1>

                <p
                  style={{
                    fontSize: "1rem",
                    color: "white",
                    marginBottom: "2rem",
                    lineHeight: "1.75",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: "700px",
                    padding: "0 2rem",
                  }}
                  className="mt-10 text-base sm:text-sm md:text-2xl font-normal text-white mb-8 leading-relaxed text-center max-w-prose"
                >
                  Step into the world of limitless creativity with our AI image
                  generator! From eye-catching visuals to artistic masterpieces,
                  you can create it all in just a few clicks.
                </p>
              </div>

              <div className="flex justify-center mt-10 mb-16 items-center">
                <div className="w-full max-w-sm">
                  <div
                    className="relative overflow-hidden rounded-xl"
                    style={{
                      background:
                        "linear-gradient(to right, #1e1b4b, #312e81, #1e1b4b)",
                      boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)",
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 px-6 sm:px-0 sm:w-full h-full animate-pulse"
                      style={{
                        background:
                          "linear-gradient(45deg, transparent 45%, rgba(168, 162, 255, 0.1) 50%, transparent 55%)",
                        animation: "shine 3s infinite",
                      }}
                    />

                    <p className="relative px-2 sm:px-6 sm:py-4 py-2 text-center text-lg font-medium">
                      You have{" "}
                      <span
                        className="font-bold"
                        style={{
                          background:
                            "linear-gradient(to right, #a5b4fc, #818cf8)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 0 10px rgba(165, 180, 252, 0.3)",
                        }}
                      >
                        3 credits
                      </span>{" "}
                      for Free
                    </p>
                  </div>
                </div>
              </div>

              <style jsx global>{`
                @keyframes shine {
                  0% {
                    transform: translateX(-100%);
                  }
                  50%,
                  100% {
                    transform: translateX(100%);
                  }
                }
              `}</style>
            </div>

            <div className="mb-8 flex flex-col items-center justify-center">
              <div className="relative justify-center items-center group">
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600
                      rounded-full blur-xl opacity-20 group-hover:opacity-50 animate-pulse
                      transition-all duration-500 group-hover:duration-200"
                />
                <div className="flex justify-center items-center mb-4">
                  <p> Don't waste time let's start now</p>
                </div>
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500
                      rounded-full blur-md opacity-30 group-hover:opacity-60 animate-pulse
                      transition-all duration-500 group-hover:duration-200"
                />

                <a
                  href="/aperture"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative block"
                >
                  <button
                    type="button"
                    className="relative w-48 px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700
                     rounded-full transition-all duration-300
                     transform hover:scale-105 hover:shadow-2xl
                     group-hover:shadow-[0_0_2rem_-0.5rem_#8b5cf6]
                     border border-violet-400/20"
                  >
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                      <div
                        className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent
                           via-white/30 to-transparent group-hover:left-full transform
                           transition-all duration-1000 ease-out"
                      />
                    </div>

                    <div
                      className="relative flex items-center justify-center gap-3
                         text-white font-medium text-sm"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-500 ease-out
                         ${
                           isHovered
                             ? "scale-0 opacity-0"
                             : "scale-100 opacity-100"
                         }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>

                      <span className="font-semibold tracking-wide">
                        Get Started
                      </span>

                      <svg
                        className={`w-5 h-5 transition-all duration-500 ease-out
                         ${
                           isHovered
                             ? "translate-x-1 scale-100 opacity-100"
                             : "scale-0 opacity-0"
                         }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px
                         bg-gradient-to-r from-transparent via-violet-400 to-transparent
                         opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </button>
                </a>
              </div>
            </div>

            <div className="flex justify-center mt-16 items-center w-full p-4 bg-indigo-900">
              <h1 className="font-medium sm:font-bold text-2xl sm:text-3xl">
                Examples of Generated images
              </h1>
            </div>

            <div className="flex space-x-2 px-2">
              {Object.values(CATEGORIES).map((categoryName) => (
                <Button
                  key={categoryName}
                  icon={<BsCameraReelsFill />}
                  name={categoryName}
                  handleClick={() => changeCategory(categoryName)}
                  category={category}
                />
              ))}
            </div>

            <div className="mt-2">&nbsp;</div>
            <div className="mt-3 relative px-2 md:px-7 w-full">
              <div
                className="active:outline-none focus:outline-none overflow-hidden new-css-style-box"
                role="grid"
                tabIndex={0}
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  listStyle: "none",
                  margin: "0",
                  padding: "0",
                  gap: ".1rem",
                }}
              >
                {loader ? (
                  <div className="flex justify-center items-center w-full">
                    Loading...
                  </div>
                ) : arrayRender.length > 0 ? (
                  arrayRender.map((item) => (
                    <ImageCardHomePage
                      key={item._id}
                      item={item}
                      setSingleID={setSingleID}
                      activeUser={activeUser}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center w-full text-zinc-400">
                    No images available in this category.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "10rem" }}>
        <Footer />
      </div>

      {singleID && (
        <SingleImage singleID={singleID} setSingleID={setSingleID} />
      )}
    </div>
  );
};

export default Index;
