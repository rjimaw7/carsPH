import React from "react";
import { Link } from "react-router-dom";
import carHero from "../assets/jpg/carhero1.jpg";
import Footer from "../components/Footer";

function Explore() {
  return (
    <>
      <section className="relative bg-white">
        <img
          className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
          src={carHero}
          alt="Couple on a bed with a dog"
        />

        <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-white sm:to-transparent"></div>

        <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your
              <strong className="font-extrabold text-rose-700 sm:block">
                Next Car.
              </strong>
            </h1>

            <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
              Buy, Sell or Rent a Car
            </p>

            <div className="flex  gap-4 mt-8 text-center">
              <Link
                className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-black sm:w-auto  focus:outline-none focus:ring"
                to="/create-listing"
              >
                Create Car Listing
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* I WANT TO SECTION */}

      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-black">
            Check Our Featured Listings
          </h1>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
            <Link to="/category/sale">
              <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  Buy a Car
                </h1>

                <p className="text-gray-500 dark:text-gray-300">
                  Find your next dream car . Check our latest car listings
                </p>
              </div>
            </Link>

            <Link to="/category/rent">
              <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  Rent a Car
                </h1>

                <p className="text-gray-500 dark:text-gray-300">
                  Rent the best cars available today .
                </p>
              </div>
            </Link>

            <Link to="/offers">
              <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  Check Discounted Cars
                </h1>

                <p className="text-gray-500 dark:text-gray-300">
                  Find the best car deals available here
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Explore;
