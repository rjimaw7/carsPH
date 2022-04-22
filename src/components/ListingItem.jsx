import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";

function ListingItem({ listing, id, onEdit, onDelete }) {
  const location = useLocation();

  return (
    <>
      <section className="container mx-auto">
        <div className="max-w-screen-xl px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 mt-8 lg:grid-cols-1 gap-x-4 gap-y-8">
            <>
              <div className="block">
                <Link to={`/category/${listing.type}/${id}`}>
                  <img
                    alt="Trainer Product"
                    src={listing.imgUrls}
                    className="object-cover w-full -mt-3 h-96"
                  />
                </Link>
                <h5 className="mt-4 text-sm text-black/90">{listing.brand}</h5>

                <div className="flex items-center justify-between mt-4 font-bold">
                  <p className="text-lg">
                    ₱{" "}
                    {listing.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  {location.pathname === `/profile` && (
                    <>
                      <div className="flex flex-column">
                        <span
                          onClick={() => onDelete(listing.id, listing.name)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            onClick={() => onEdit(id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </span>
                      </div>
                    </>
                  )}
                  <p className="text-xs tracking-wide uppercase">
                    {listing.model}
                  </p>
                </div>
              </div>
            </>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListingItem;
