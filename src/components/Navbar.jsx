import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUser();
  const countProduct = user?.unsafeMetadata.cart
    ? Object.keys(user.unsafeMetadata.cart).length
    : 0;

  return (
    <div className="flex items-center justify-between  py-5 font-medium">
      <Link to="/">
        <img src={assets.realLogo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-1/2 border-b-2 border-black h-[1.5px] hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-1/2 border-b-2 border-black h-[1.5px] hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-1/2 border-b-2 border-black h-[1.5px] hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-1/2 border-b-2 border-black h-[1.5px] hidden" />
        </NavLink>
        {/* {!!user ? (

        )} */}
      </ul>
      <div className="flex gap-5 items-center">
        {!!user ? (
          <>
            <div className="group relative">
              <img
                className="w-5 cursor-pointer"
                src={assets.profile_icon}
                alt="profile"
              />{" "}
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p className="cursor-pointer hover:text-black">Orders</p>
                  <p className="cursor-pointer hover:text-black">
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </p>
                </div>
              </div>
            </div>
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                alt="cart"
                className="w-5 cursor-pointer min-w-5"
              />
              {countProduct > 0 && (
                <p className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 aspect-square rounded-full">
                  {countProduct}
                </p>
              )}
            </Link>
          </>
        ) : (
          <SignInButton className="p-2 bg-blue-300 hover:bg-blue-400 text-lg">
            Sign In
          </SignInButton>
        )}
      </div>
      {/* Sidebar menu for mobile */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          isMenuOpen ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-4 p-3 cursor-pointer pb-10"
          >
            <img
              src={assets.dropdown_icon}
              alt="close"
              className=" h-4 rotate-180 "
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
