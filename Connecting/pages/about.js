import React from "react";
import { Header } from "../Components/index.js";
import Footer from "../Components/Global/Footer.jsx";

import hauwa2 from "../aboutUs/hawa2.png";
import destiny2 from "../aboutUs/destiny2.png";
import franck from "../aboutUs/franck.png";
import neo2 from "../aboutUs/neo.png";
import hakim from "../aboutUs/hakim.png";

import AboutCom from "../Components/Global/aboutCom.jsx";
const about = () => {
  const AboutUs = [
    {
      image: hakim,
      title: "Hakim Nasser",
      role: "Team Leader",
      linkdin: "http://www.linkedin.com/in/hakim-nasser-ngounouno-2180bb282  ",
      email: "hakimngounouno@gmail.com",
      description:
        "As a budding professional, I am passionate about the web and digital world. I am eager to lead a team, leveraging my enthusiasm to foster collaboration while acquiring new knowledge and experience.",
    },
    {
      image: franck,
      title: "Franck polla Tekam ",
      role: "Full stack developer  ",
      linkdin: "https://www.linkedin.com/in/franck-polla-ba9976288/ ",
      email: "fpolla640@gmail.com",
      description:
        "I've been working in the tech industry for over 2 years, focusing primarily on web development and Ai . I'm passionate about breaking down complex problems and creating innovative solutions. ",
    },
    ,
    {
      image: neo2,
      title: " OGBEIDE NEO EHIMARE",
      role: "Business Analyst ",
      linkdin: "http://www.linkedin.com/in/max-neo-22a749339 ",
      email: "Maxneo1010@gmail.com",
      description:
        "Been working with stakeholders to understand the specific needs of the business regarding AI image generation. And ensuring that AI image generation tools align with organizational goals and provide value.",
    },
    {
      image: hauwa2,
      title: "Hauwa Wakil adamu ",
      role: "Technical Writer ",
      linkdin:
        "https://www.linkedin.com/in/destiny-omosigho-998320295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app  ",
      email: "Hauwawakeeel@gmail.com",
      description:
        "I create clear, concise documentation and user guides to explain complex technical information for diverse audiences. i collaborate with developers and product teams to produce manualsand digital content.",
    },
    {
      image: destiny2,
      title: "Destiny Osakpolor ",
      role: " Content writer ",
      linkdin:
        "https://www.linkedin.com/in/destiny-omosigho-998320295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app  ",
      email: "omosighodestiny123@gmail.com",
      description:
        "I've been working in the tech industry and creative space for quite some time now, specializing in designing visually appealing and user-friendly interfaces for digital products, including websites, apps and software.",
    },
  ];
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
            className=" md:m-40 lg:m-48 w-48 px-8 md:px-20 text-center "
            style={{
              marginBottom: "44px",
              padding: "100px",
              textAlign: "center",
            }}
          >
            In the age of technical advances, AI image generator is becoming
            increasingly popular. HAHO AI was created by Computer Information
            Systems (CIS) students in Near East University as our graduation
            project (CIS400) during our final year from 2023-2024 (Spring) and
            submitted in 2024-2025 (Fall). The aim of this project is to develop
            an AI image generator that not only generates images that the user
            can appreciate, but also differentiates ourself from other image
            generators through our simplicity. HAHO AI comes to you with a
            wonderful form of experience you have never seen.
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
