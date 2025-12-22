import React from "react";
import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div  className="flex flex-col items-center justify-center h-screen gap-6" role="status"  aria-live="polite" >

      <Oval height={70} width={70} color="#6366F1"  secondaryColor="#A5B4FC"  strokeWidth={4}  strokeWidthSecondary={4}  ariaLabel="loading" />

      <motion.p initial={{ opacity: 0.4 }}  animate={{ opacity: 1 }}  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-indigo-600 font-semibold text-lg" >
        Loading, please wait...
      </motion.p>
    </div>
  );
};

export default Loading;
