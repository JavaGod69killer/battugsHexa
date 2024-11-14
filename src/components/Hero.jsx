import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div
      className="flex sm:flex-row border border-gray-400 min-h-[500px] items-center justify-center"
      style={{ backgroundImage: `url(${assets.twoMen})` }}
    >
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 text-center">
        <div className="px-auto">
          <div className="flex items-center gap-2 justify-center">
            <p className="w-8 md:w-11 h-[2px] bg-white"></p>
            <p className="font-medium text-sm text-white md:text-base ">
              Our bestsellers
            </p>
          </div>
          <h1 className="prata-regular text-3xl text-white sm:py-3 lg:text-5xl leading-relaxed">
            Check our products
          </h1>
          <div className="flex items-center gap-2 justify-center">
            <p className="font-semibold text-sm text-white md:text-base">
              Shop now
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-white"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
