import React from "react";
import ResetPassword from "../Components/Global/resetPassword";

const resetPassword = () => {
  return (
    <div className="flex h-full w-full mt-20 sm:mt-40 justify-center items-center">
      <div className="h-screen">
        <ResetPassword />
      </div>
    </div>
  );
};

export default resetPassword;
