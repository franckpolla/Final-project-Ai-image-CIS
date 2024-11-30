import React from "react";
import { CreditCard, ArrowRight } from "lucide-react";
const Subscription = ({ activeUser }) => {
  if (!activeUser || activeUser.credit > 5) return null;

  return (
    <div
      className="flex flex-col w-full flex-1 items-center justify-center
  "
      style={{ position: "relative" }}
    >
      <div className="max-w-md mx-auto bg-indigo-800 p-4 border-2 border-indigo-500 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <CreditCard className="text-indigo-600 w-10 h-10" />
            <div>
              <h3 className="text-xl font-bold text-indigo-800">
                Credit Balance
              </h3>
              <p className="text-indigo-600 font-medium">
                {activeUser.credit} credits remaining
              </p>
            </div>
          </div>

          <div className="bg-indigo-100 rounded-lg p-3 border border-indigo-200">
            <p className="text-indigo-800 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-indigo-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Low credits detected
            </p>
            <p className="text-yellow-400 mt-2 text-sm">
              You're running low on credits. Purchase more to continue
              generating images.
            </p>
          </div>

          <a href="/account" className="block">
            <button
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-indigo-700 
            text-white font-semibold py-3 rounded-lg 
            hover:from-indigo-700 hover:to-indigo-800 
            transition-all duration-300 
            transform active:scale-95 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <span>View Plans</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
