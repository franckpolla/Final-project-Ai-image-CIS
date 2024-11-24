import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { Loader } from "../index.js";
import { LoginLogo } from "../SVG";
import { BUYING_CREDIT } from "../../Utils";

const MAX_PLAN = process.env.NEXT_PUBLIC_MAX_PLAN;

const PRO_PLAN = process.env.NEXT_PUBLIC_PRO_PLAN;

const STARTER_PLAN = process.env.NEXT_PUBLIC_STARTER_PLAN;

const PaymentProssing = ({ buying, setBuying }) => {
  const [buyStatus, setBuyStatus] = useState("WAIT PROCESSING");

  const CAllING_BUYING_CREDIT = async (buying) => {
    try {
      if (buying == "Max plan") {
        setBuyStatus("crediting.....");
        const response = await BUYING_CREDIT(MAX_PLAN);
        setBuyStatus("SUCCESS");
        Router.push("/");
        setBuying();
      } else if (buying == "Pro plan") {
        setBuyStatus("crediting.....");
        const response = await BUYING_CREDIT(PRO_PLAN);
        setBuyStatus("SUCCESS");
        Router.push("/");
        setBuying();
      } else if (buying == "Starter plan") {
        setBuyStatus("crediting.....");
        const response = await BUYING_CREDIT(STARTER_PLAN);
        setBuyStatus("SUCCESS");
        Router.push("/");
        setBuying();
      } else {
        setBuyStatus("wait processing...");
      }
    } catch (error) {
      console.error(error.message);
      setBuyStatus("ERROR, Contact support Team for assistance");
    }
  };
  useEffect(() => {
    CAllING_BUYING_CREDIT(buying);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-zinc-900 bg-opacity-40 z-50"
        style={{ pointerEvents: "auton" }}
      >
        <div
          className="bg-zinc-800 items-center fixed shadow-xl rounded-2xl z-50
    px-8 py-8 text-sm border border-zinc-700 "
          style={{
            top: "50%",
            transform: "translate(-50%,-50%)",
            left: "50%",
            maxWidth: "330px",
            width: "100%",
            maxHeight: "85vh",
          }}
        >
          <div className="flex flex-col text-zinc-200 text-center items-center">
            <LoginLogo />
            <div className="new_loader JS_on">
              <span className="binary"> </span>
              <span className="binary"> </span>
              <span className="getting-there">{buyStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentProssing;
