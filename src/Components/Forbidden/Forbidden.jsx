import React from "react";
import { Player } from "@lottiefiles/react-lottie-player"; 
import { Link } from "react-router";
import forbiddenAnim from "../../assets/forbidden.json"; 

const ForbiddenAccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 px-6">
      <Player autoplay loop src={forbiddenAnim}  style={{ height: "260px", width: "260px" }}/>
      <h1 className="text-2xl sm:text-3xl md:text4xl font-bold text-indigo-500 mt-4">Forbidden Access (403)</h1>
      <p className="text-gray-600 mt-2 text-[1rem] sm:text-[1.2rem] text-center"> You don’t have permission to view this page. </p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="btn bg-indigo-600 text-white hover:bg-indigo-700"> Go Home </Link>
        <Link to="/login" className="btn bg-indigo-100 text-gray-800 hover:bg-indigo-200"> Login </Link>
      </div>
    </div>
  );
};

export default ForbiddenAccess;