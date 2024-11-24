import React, { useState, useEffect } from "react";
import { CheckCircleIcon } from "lucide-react";

const SignupSuccessPopup = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-indigo-900 text-white rounded-lg shadow-lg flex items-center p-4 space-x-4 max-w-sm">
        <CheckCircleIcon className="text-green-500 w-8 h-8" />
        <div>
          <h2 className="text-lg font-semibold">Sign Up Successful!</h2>
          <p className="text-sm">You have successfully signed up.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccessPopup;
