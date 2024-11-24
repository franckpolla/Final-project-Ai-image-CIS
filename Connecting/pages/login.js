import React, { useState, useEffect } from "react";

const Login = () => {
  const imagePaths = [
    "../uploads/aiLoginPage.webp",
    "../uploads/6721ee841389f067699cd110_5_2024-11-14T19-59-12.333Z.jpg",
    "../uploads/aiLoginPage2.webp",
    "../uploads/672b3aedeeb3dc4fd3256559_13_2024-11-06T10-08-12.524Z.jpg",
    "../uploads/672b3aedeeb3dc4fd3256559_14_2024-11-06T17-51-07.051Z.jpg",
    "../uploads/672b3aedeeb3dc4fd3256559_15_2024-11-06T17-54-39.839Z.jpg",
    "../uploads/6721ee841389f067699cd110_5_2024-11-14T19-59-12.333Z.jpg",
    "../uploads/6721ee841389f067699cd110_7_2024-11-14T21-43-52.361Z.jpg",
    "../uploads/6721ee841389f067699cd110_8_2024-11-14T21-46-35.490Z.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagePaths.length]);

  // Helper function to create a seamless looping effect
  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = 0; i < 3; i++) {
      visibleImages.push(imagePaths[(currentIndex + i) % imagePaths.length]);
    }
    return visibleImages;
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-200">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1 h-full">
        {getVisibleImages().map((item, index) => (
          <div
            key={index}
            className={`relative w-full h-full animate-slide-down-${index}`}
          >
            <img
              src={item}
              alt={`image-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
