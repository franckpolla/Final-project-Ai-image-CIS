import React from "react";

const aboutCom = () => {
  return (
    <div>
      <div className=" w-full">
        <div className="p-5 bg-indigo-400  border rounded text-center text-gray-500 max-w-sm mx-auto">
          <img
            className="w-36 h-32 rounded-full mx-auto"
            src="https://loremflickr.com/320/320/girl"
            alt="Profile picture of Jane Doe"
          />
          <div className="text-sm mt-5">
            <a
              href="#"
              className="font-bold text-xl sm:text-2xl  leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
            >
              Jane Doe
            </a>
            <p className="font-normal ">Blogger &amp; YouTuber</p>
          </div>

          <p className="mt-4 text-sm text-gray-900">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia maiores et perferendis eaque.
          </p>

          <div className="flex mt-4 justify-center space-x-2">
            <a href="#" className="w-6 mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-instagram"
                color="pink"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="w-6 mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-facebook"
                color="blue"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
