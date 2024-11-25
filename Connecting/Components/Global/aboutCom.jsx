import React from "react";
import Image from "next/image";
const aboutCom = ({ image, title, role, linkdin, email, description }) => {
  return (
    <div>
      <div className=" w-full">
        <div className="p-5 bg-indigo-400  border rounded text-center text-gray-500 max-w-sm mx-auto">
          <Image
            className="w-36 h-32 rounded-full mx-auto"
            src={image}
            alt={`${title} profile picture`}
          />
          <div className="text-sm mt-5">
            <p className="font-bold text-xl sm:text-2xl  leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
              {title}
            </p>
            <p className="font-normal ">{role}</p>
          </div>

          <p className="mt-4 text-sm text-gray-900">{description}</p>

          <div className="flex mt-4 justify-center space-x-2">
            <a href={linkdin} className="w-6 mx-1">
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
                color="blue"
                class="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href={`mailto:${email}`} className="w-6 mx-1">
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
                color="red"
                class="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            {/* Add more icons as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutCom;

// className="w-36 h-32 rounded-full mx-auto"
