import React from "react";
import { Header } from "../Components/index.js";
import Footer from "../Components/Global/Footer.jsx";

import hauwa2 from "../aboutUs/hawa2.png";
import destiny2 from "../aboutUs/destiny2.png";
import franck from "../aboutUs/franck.png";
import neo2 from "../aboutUs/neo.png";

import AboutCom from "../Components/Global/aboutCom.jsx";
const about = () => {
  const AboutUs = [
    {
      image: destiny2,
      title: "Destiny Osakpolor Omosigho",
      role: " ",
      linkdin:
        "https://www.linkedin.com/in/destiny-omosigho-998320295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app  ",
      email: "omosighodestiny123@gmail.com",
      description: "",
    },

    {
      image: neo2,
      title: " OGBEIDE NEO EHIMARE",
      role: " ",
      linkdin: "http://www.linkedin.com/in/max-neo-22a749339 ",
      email: "Maxneo1010@gmail.com",
      description: "",
    },
    {
      image: hauwa2,
      title: "Hauwa Wakil adamu ",
      role: " ",
      linkdin:
        "https://www.linkedin.com/in/destiny-omosigho-998320295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app  ",
      email: "Hauwawakeeel@gmail.com",
      description: "",
    },
    {
      image: franck,
      title: "Franck polla Tekam ",
      role: "Full stack developer  ",
      linkdin: "https://www.linkedin.com/in/franck-polla-ba9976288/ ",
      email: "fpolla640@gmail.com",
      description:
        "I've been working in the tech industry for over 15 years, focusing primarily on AI and machine learning. I'm passionate about breaking down complex problems and creating innovative solutions. My goal is to help people unlock their full potential and make a positive impact on the world.",
    },
  ];
  console.log("this is th", destiny2);
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
          {AboutUs.map((item) => (
            <AboutCom
              key={item.title}
              image={item.image}
              role={item.role}
              title={item.title}
              linkdin={item.linkdin}
              email={item.email}
              description={item.description}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
