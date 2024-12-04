import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BsCameraReelsFill } from "../Components/SVG/index.js";
import {
  Header,
  GetStarted,
  Button,
  ImageCard,
  SingleImage,
} from "../Components/index.js";
import { CHECK_AUTH_USER, GET_AI_IMAGES } from "../Utils/index.js";
import Footer from "../Components/Global/Footer.jsx";
const IMAGE_SIZES = {
  REEL: "1024x1792",
  INSTAGRAM: "1024x1024",
  YOUTUBE: "1792x1024",
};
const CATEGORIES = {
  REEL: "Reel",
  INSTAGRAM: "Instagram",
  YOUTUBE: "Youtube",
};

const Likes = () => {
  const [category, setCategory] = useState(CATEGORIES.REEL);
  const [activeUser, setActiveUser] = useState(null);
  const [singleID, setSingleID] = useState("");
  const [imagesBySize, setImagesBySize] = useState({
    [IMAGE_SIZES.REEL]: [],
    [IMAGE_SIZES.INSTAGRAM]: [],
    [IMAGE_SIZES.YOUTUBE]: [],
  });
  const [displayedImages, setDisplayedImages] = useState([]);

  const hasAnyLikedImages = Object.values(imagesBySize).some(
    (images) => images.length > 0
  );

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    const sizeMap = {
      [CATEGORIES.REEL]: IMAGE_SIZES.REEL,
      [CATEGORIES.INSTAGRAM]: IMAGE_SIZES.INSTAGRAM,
      [CATEGORIES.YOUTUBE]: IMAGE_SIZES.YOUTUBE,
    };
    setDisplayedImages(imagesBySize[sizeMap[newCategory]]);
  };

  useEffect(() => {
    const fetchUserAndImages = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const user = await CHECK_AUTH_USER();
        const allImages = await GET_AI_IMAGES();

        const categorizedImages = {
          [IMAGE_SIZES.REEL]: [],
          [IMAGE_SIZES.INSTAGRAM]: [],
          [IMAGE_SIZES.YOUTUBE]: [],
        };

        allImages.forEach((image) => {
          if (image.likes.includes(user._id)) {
            categorizedImages[image.size].push(image);
          }
        });

        setActiveUser(user);
        setImagesBySize(categorizedImages);

        // Find the first category that has images and set it as default
        const firstCategoryWithImages = Object.entries(categorizedImages).find(
          ([_, images]) => images.length > 0
        );

        if (firstCategoryWithImages) {
          const categoryName = Object.keys(CATEGORIES).find(
            (key) => IMAGE_SIZES[key] === firstCategoryWithImages[0]
          );
          setCategory(CATEGORIES[categoryName]);
          setDisplayedImages(firstCategoryWithImages[1]);
        } else {
          setDisplayedImages([]); // No images in any category
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserAndImages();
  }, []);

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="mb-44 sm:mb-0 sm:mt-[56px]">
        <div className="flex  mb-24 flex-col">
          <GetStarted />
          <div className="w-screen overflow-x-hidden flex flex-col items-center py-4 mt-16">
            <h1 className="text-7xl font-logo font-bold mt-0">Favorites</h1>

            {hasAnyLikedImages ? (
              <>
                <div className="flex space-x-2 px-2 mt-10">
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
                    className="active:outline-none  focus:outline-none overflow-hidden new-css-style-box"
                    role="grid"
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
                    {displayedImages.length > 0 ? (
                      [...displayedImages]
                        .reverse()
                        .map((image) => (
                          <ImageCard
                            key={image._id}
                            item={image}
                            setSingleID={setSingleID}
                            activeUser={activeUser}
                          />
                        ))
                    ) : (
                      <div className="flex justify-center items-center w-full  text-center text-sm mt-4 text-zinc-400">
                        <p className="flex text-center items-center justify-center">
                          No liked images in this category.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center px-10 text-sm mt-4 text-zinc-400">
                <p>You haven&apos;t liked any images yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {singleID && (
        <SingleImage singleID={singleID} setSingleID={setSingleID} />
      )}
      <div style={{ marginTop: "6rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Likes;
