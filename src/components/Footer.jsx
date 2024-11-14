import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white h-1/4">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="px-40 py-10">
          <img src={assets.realLogo} alt="logo" className="w-32 mb-5" />
          <p className="text-white w-full sm:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>

        <div className="flex flex-col gap-2 py-10">
          <p className="mb-5 text-xl font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-white">
            <li>Home</li>
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="py-10">
          <p className="mb-5 text-xl font-medium">CONTACT</p>
          <ul className="flex flex-col gap-1 text-white">
            <li>+976 89475188</li>
            <li>udelgombotamira@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="w-full" />
        <p className="text-center text-white text-sm py-5">
          &copy; {new Date().getFullYear()} Udelgombotamira. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
