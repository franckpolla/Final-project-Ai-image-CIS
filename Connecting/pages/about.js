import React from "react";
import { Header } from "../Components/index.js";
import Footer from "../Components/Global/Footer.jsx";

import AboutCom from "../Components/Global/aboutCom.jsx";
const about = () => {
  return (
    <div>
      <Header />
      <div className="mt-24 mb-8 ">
        <div className="relative  flex  flex-col justify-center items-center ">
          <h1 className="font-bold text-2xl sm:text-4xl md:text-6xl">
            About us
          </h1>
          <p className=" text-gray-600" style={{ marginBottom: "54px" }}>
            Discover who we are .
          </p>

          <h2 className=" left-1 flex  px-10 text-2xl font-bold">
            Who are we ?
          </h2>

          <p
            className=" px-8 md:px-20 text-center "
            style={{
              marginBottom: "44px",
              padding: "100px",
            }}
          >
            Founded in 2024, HAHO is driven to provide to our partners the
            opportunity to express their creativity by generating images from
            just a few key words. We are driven by values such as innovation and
            the exchange of ideas, and this is what guides all our actions. Our
            mission is to help users to freely express their deepest thoughts.
            With a young and passionate team, we work to put a face on words.
          </p>
        </div>
        <div></div>

        <div className=" w-96 flex flex-col md:flex-row gap-4 p-4">
          <AboutCom />
          <AboutCom />
          <AboutCom />
          <AboutCom />
          <AboutCom />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
