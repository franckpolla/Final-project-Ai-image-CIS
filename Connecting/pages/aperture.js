import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  FaInstagram,
  AiOutlineYoutube,
  BsCameraReelsFill,
} from "../Components/SVG/index.js";
import {
  Header,
  GetStarted,
  ImageCard,
  SingleImage,
  ApertImageCard,
  PromptInput,
  Prompt,
  Subscription,
  Button,
  PaymentProssing,
  AIProcessing,
} from "../Components/index.js";

import {
  CHECK_AUTH_USER,
  IMAGE_GENERATOR_V3,
  GET_AI_IMAGES,
} from "../Utils/index.js";
import Footer from "../Components/Global/Footer.jsx";
const aperture = () => {
  const [loader, setLoader] = useState(false);
  const [singleID, setSingleID] = useState("");
  const [category, setCategory] = useState("Youtube");
  const [error, setError] = useState();
  const [activeUser, setActiveUser] = useState(null);
  const [allAIImages, setAllAIImages] = useState();
  const [promptv3, setPromptv3] = useState({
    prompt: "",
    negativePrompt: "",
    size: "1024x1024",
    style: "vivid",
  });

  // V3
  const [V3_1024x1024, setV3_1024x1024] = useState([]);
  const [V3_1792x1024, setV3_1792x1024] = useState([]);
  const [V3_1024x1792, setV3_1024x1792] = useState([]);

  const CLICK_V3 = async (promptv3) => {
    try {
      setLoader(true);
      const response = await IMAGE_GENERATOR_V3(promptv3);
      if (response === "data is missing") {
        setError("Data is missing");
        setLoader(false);
        console.log(response);
      } else if (response.status === 201) {
        setLoader(false);
        setSingleID(response.data.post._id);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  const changeCategory = (category) => {
    if (category === "Reel") {
      setAllAIImages(V3_1024x1792);
      setCategory("Reel");
    } else if (category === "Instagram") {
      setAllAIImages(V3_1024x1024);
      setCategory("Instagram");
    } else if (category === "Youtube") {
      setAllAIImages(V3_1792x1024);
      setCategory("Youtube");
    }
    console.log("Images after category change:", allAIImages);
  };

  const Get_User = async () => {
    const storedCookieValue = Cookies.get("token");
    if (storedCookieValue) {
      const user = await CHECK_AUTH_USER();
      console.log("this is the active user", user);

      setActiveUser(user);
    }
  };

  const CALLING_ALL_POSTS = async () => {
    try {
      const storedCookieValue = Cookies.get("token");
      if (storedCookieValue) {
        const user = await CHECK_AUTH_USER();
        setActiveUser(user);
        const response = await GET_AI_IMAGES(user._id);

        const V3_1024x1024Temp = [];
        const V3_1792x1024Temp = [];
        const V3_1024x1792Temp = [];
        response.forEach((element) => {
          if (element.size === "1024x1792") {
            V3_1024x1792Temp.push(element);
          } else if (element.size === "1024x1024") {
            V3_1024x1024Temp.push(element);
          } else if (element.size === "1792x1024") {
            V3_1792x1024Temp.push(element);
          }
        });

        setV3_1024x1792(V3_1024x1792Temp);
        setV3_1024x1024(V3_1024x1024Temp);
        setV3_1792x1024(V3_1792x1024Temp);

        // Set images for the default category (Youtube)
        setAllAIImages(V3_1792x1024Temp);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    CALLING_ALL_POSTS();
  }, []);
  console.log("V3_1024x1024Temp:", V3_1024x1024);
  console.log("V3_1792x1024Temp:", V3_1792x1024);
  console.log("V3_1024x1792Temp:", V3_1024x1792);

  console.log("calling all images ", allAIImages);
  const arrayRender = [...(allAIImages?.reverse() || [])];
  console.log("array of all images ", arrayRender);
  return (
    <div>
      <Header />
      <div className="overflow-hidden mb-[56px] sm:mb-0 sm:mt-[56px]">
        <GetStarted />
        <div className="mb-32">
          <div className="w-screen overflow-x-hidden">
            <div className="flex items-center justify-center w-full mt-8 md:mt-10">
              <div className="px-2 md:px-10 lg:px-16 flex items-center flex-col max-w-[1300px] w-full">
                <div className="w-full flex gap-4 flex-col md:flex-row ">
                  <PromptInput
                    promptv3={promptv3}
                    setPromptv3={setPromptv3}
                    loader={loader}
                    error={error}
                    activeUser={activeUser}
                  />
                  <Prompt
                    promptv3={promptv3}
                    setPromptv3={setPromptv3}
                    loader={loader}
                    error={error}
                    activeUser={activeUser}
                    generateFunction={() => CLICK_V3(promptv3)}
                  />
                </div>

                <div
                  className="items-center w-full max-w-[800px] mt-8 px-4 pl-5 md:px-5"
                  style={{ minHeight: "1px", position: "relative" }}
                >
                  <div>
                    <Subscription activeUser={activeUser} />
                  </div>
                </div>
              </div>
            </div>
            {/* Body */}
            <div className=" flex justify-center mt-16 items-center w-full p-4 bg-indigo-900 border ">
              <h1 className="font-medium sm:font-bold text-2xl sm:text-3xl">
                Your Generated images
              </h1>
            </div>
            <div className="flex justify-center overflow-hidden items-center space-x-2 px-6">
              <Button
                icon={<BsCameraReelsFill />}
                name={"Reel"}
                handleClick={() => changeCategory("Reel")}
                category={category}
              />
              <Button
                icon={<BsCameraReelsFill />}
                name={"Youtube"}
                handleClick={() => changeCategory("Youtube")}
                category={category}
              />
              <Button
                icon={<BsCameraReelsFill />}
                name={"Instagram"}
                handleClick={() => changeCategory("Instagram")}
                category={category}
              />
            </div>
            <div className="mt-2">&nbsp;</div>
            <div className="mt-3 relative px-2 md:px-7  w-full">
              <div
                className="active:outline-none focus:outline-none overflow-hidden
                new-css-style-box"
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
                <>
                  {arrayRender?.map((item) => (
                    <ImageCard
                      item={item}
                      setSingleID={setSingleID}
                      activeUser={activeUser}
                    />
                  ))}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {singleID && (
        <SingleImage singleID={singleID} setSingleID={setSingleID} />
      )}
      {loader && <AIProcessing />}
    </div>
  );
};

export default aperture;
