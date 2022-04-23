import React from "react";

import { Link, useNavigate } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* <!-- component -->
<!-- This is an example component --> */}
      <div className=" bg-gray-900">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-3xl mb-3"> Download our mobile app </h3>
            <p> Be smart, Ride safe . </p>
            <div className="flex justify-center my-10">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center border w-auto rounded-lg px-4 py-2 w-52 mx-2"
              >
                <img
                  alt="footer1"
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  className="w-7 md:w-8"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Google Play Store </p>
                </div>
              </a>
              <a
                href="https://www.apple.com/ph/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center border w-auto rounded-lg px-4 py-2 w-44 mx-2"
              >
                <img
                  alt="footer2"
                  src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                  className="w-7 md:w-8"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Apple Store </p>
                </div>
              </a>
            </div>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              {" "}
              &copy; carsPH, <span>{new Date().getFullYear()}</span>{" "}
            </p>
            <div className="order-1 md:order-2">
              <Link to="/about" className="px-2 cursor-pointer">
                About
              </Link>
              <span className="px-2 border-l cursor-pointer">
                <a
                  href="mailto:rjimaw7777@gmail.com"
                  target="_blank rel="
                  noreferrer
                >
                  Contact
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
