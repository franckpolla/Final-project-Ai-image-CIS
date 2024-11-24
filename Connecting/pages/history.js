import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { SearchIcon, BsCameraReelsFill } from "../Components/SVG/index.js";
import {
  Header,
  GetStarted,
  Button,
  ImageCard,
  SingleImage,
} from "../Components/index.js";
import { CHECK_AUTH_USER, GET_AI_IMAGES } from "../Utils/index.js";
import Footer from "../Components/Global/Footer.jsx";

const History = () => {
  const [category, setCategory] = useState("Reel");
  const [activeUser, setActiveUser] = useState(null);
  const [allAIImages, setAllAIImages] = useState([]);
  const [allPostCopy, setAllPostCopy] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [singleID, setSingleID] = useState("");

  const [V3_1024x1024, setV3_1024x1024] = useState([]);
  const [V3_1792x1024, setV3_1792x1024] = useState([]);
  const [V3_1024x1792, setV3_1024x1792] = useState([]);

  const changeCategory = (category) => {
    if (category === "Reel") {
      setAllAIImages(V3_1024x1792);
      setAllPostCopy(V3_1024x1792);
      setCategory("Reel");
    } else if (category === "Instagram") {
      setAllAIImages(V3_1024x1024);
      setAllPostCopy(V3_1024x1024);
      setCategory("Instagram");
    } else if (category === "Youtube") {
      setAllAIImages(V3_1792x1024);
      setAllPostCopy(V3_1792x1024);
      setCategory("Youtube");
    }
  };

  const Get_User = async () => {
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
      setAllAIImages(V3_1024x1792Temp);
      setAllPostCopy(V3_1024x1792Temp);
    }
  };

  useEffect(() => {
    Get_User();
  }, []);

  const handleSearch = () => {
    const filterPosts = allPostCopy.filter(({ prompt }) =>
      prompt.toLowerCase().includes(searchItem.toLowerCase())
    );
    setAllAIImages(filterPosts); // Move this before the return
  };

  // Added real-time search functionality
  useEffect(() => {
    if (searchItem) {
      const filterPosts = allPostCopy.filter(({ prompt }) =>
        prompt.toLowerCase().includes(searchItem.toLowerCase())
      );
      setAllAIImages(filterPosts);
    } else {
      setAllAIImages(allPostCopy);
    }
  }, [searchItem, allPostCopy]);

  const onClearSearch = () => {
    setSearchItem("");
    setAllAIImages(allPostCopy);
  };

  return (
    <div>
      <Header />
      <div className="mb-32 sm:mb-0 sm:mt-[56px] overflow-hidden">
        <div className="flex flex-col ">
          <GetStarted />
          <div className="w-screen overflow-x-hidden flex flex-col items-center py-4 mt-16">
            <a
              href="/history"
              className="text-5xl sm:text-6xl md:text-7xl mb-8 font-logo font-bold mt-0 text-center"
            >
              History
            </a>

            <div className="flex items-center justify-center w-full max-w-[500px] px-4 pl-5 md:px-5">
              <div className="flex w-full justify-center">
                <div className="w-full">
                  <div className="w-full flex items-center relative">
                    <SearchIcon />
                    <input
                      className="bg-zinc-700 flex-1 pl-12 pr-12 rounded-full text-sm px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                      placeholder="Search for an image"
                      value={searchItem}
                      onChange={(e) => setSearchItem(e.target.value)}
                    />
                    {searchItem && (
                      <button
                        onClick={onClearSearch}
                        className="absolute right-3 text-gray-400 hover:text-white"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {allAIImages?.length ? (
              <>
                <div className="flex space-x-2 px-2">
                  <Button
                    icon={<BsCameraReelsFill />}
                    name="Reel"
                    handleClick={() => changeCategory("Reel")}
                    category={category}
                  />
                  <Button
                    icon={<BsCameraReelsFill />}
                    name="Youtube"
                    handleClick={() => changeCategory("Youtube")}
                    category={category}
                  />
                  <Button
                    icon={<BsCameraReelsFill />}
                    name="Instagram"
                    handleClick={() => changeCategory("Instagram")}
                    category={category}
                  />
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
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      listStyle: "none",
                      margin: "0",
                      padding: "0",
                    }}
                  >
                    {allAIImages.map((image) => (
                      <div key={image._id}>
                        <ImageCard
                          item={image}
                          setSingleID={setSingleID}
                          activeUser={activeUser}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center px-10 text-sm mt-4 text-zinc-400">
                <p>
                  Your Camera roll is empty.
                  <a href="/aperture" className="underline">
                    Generate images
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {singleID && (
        <SingleImage singleID={singleID} setSingleID={setSingleID} />
      )}
      <Footer />
    </div>
  );
};

export default History;
