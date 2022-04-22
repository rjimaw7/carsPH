import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import defaultHomePhoto from "../assets/jpg/home-default.png";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container mx-auto">
        <Link
          to={`/category/${listing.type}`}
          className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-black rounded-md  focus:outline-none focus:ring focus:ring-white focus:ring-opacity-80"
        >
          Go Back
        </Link>
      </div>
      <section>
        <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
          <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  alt="HouseLogo1"
                  className="object-cover rounded-xl"
                  src={listing.imgUrls[4]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 lg:mt-4">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    alt="HouseLogo1"
                    className="object-cover rounded-xl"
                    src={
                      listing.imgUrls[1] ? listing.imgUrls[1] : defaultHomePhoto
                    }
                  />
                </div>

                <div className="aspect-w-1 aspect-h-1">
                  <img
                    alt="HouseLogo2"
                    className="object-cover rounded-xl"
                    src={
                      listing.imgUrls[2] ? listing.imgUrls[2] : defaultHomePhoto
                    }
                  />
                </div>

                <div className="aspect-w-1 aspect-h-1">
                  <img
                    alt="HouseLogo3"
                    className="object-cover rounded-xl"
                    src={
                      listing.imgUrls[3] ? listing.imgUrls[3] : defaultHomePhoto
                    }
                  />
                </div>

                <div className="aspect-w-1 aspect-h-1">
                  <img
                    alt="HouseLogo4"
                    className="object-cover rounded-xl"
                    src={
                      listing.imgUrls[0] ? listing.imgUrls[0] : defaultHomePhoto
                    }
                  />
                </div>
              </div>
            </div>

            <div className="sticky top-0">
              <strong className="border border-blue-600 rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-blue-600">
                {" "}
                {listing.type.toUpperCase()}{" "}
              </strong>

              <div className="flex justify-between mt-8">
                <div className="max-w-[35ch]">
                  <h1 className="text-2xl font-bold">{listing.brand}</h1>

                  <p className="mt-0.5 text-sm">{listing.model}</p>

                  <div className="flex mt-2 -ml-0.5">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="w-5 h-5 text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg font-bold">
                  {listing.offer ? (
                    <>
                      {`Discounted Price - ₱ ${listing.discountedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    </>
                  ) : (
                    <>
                      {`Regular Price - ${listing.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    </>
                  )}
                </p>
              </div>
              <form className="mt-8">
                <fieldset>
                  <legend className="mb-1 text-sm font-medium">
                    Car Details
                  </legend>

                  <div className="flow-root">
                    <div className="flex flex-wrap -m-0.5">
                      <label className="cursor-pointer p-0.5">
                        <strong className="border border-black rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-black">
                          {" "}
                          {listing.firstOwner ? "First Owner" : "Second Owner"}
                        </strong>
                      </label>

                      <label className="cursor-pointer p-0.5">
                        <strong className="border border-black rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-black">
                          {" "}
                          {listing.fueltype}
                        </strong>
                      </label>

                      {listing.offer && (
                        <>
                          <label className="cursor-pointer p-0.5">
                            <strong className="border border-black rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-black">
                              {" "}
                              Regular Price- : ₱
                              {listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </strong>
                          </label>
                        </>
                      )}

                      {listing.type === "rent" && (
                        <>
                          <label className="cursor-pointer p-0.5">
                            <strong className="border border-black rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-black">
                              {" "}
                              Price per month : ₱
                              {listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </strong>
                          </label>
                        </>
                      )}

                      <label className="cursor-pointer p-0.5">
                        <input
                          type="radio"
                          name="color"
                          id="color_cb"
                          className="sr-only peer"
                        />
                      </label>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="mt-4">
                  <legend className="mb-1 text-sm font-medium">Location</legend>

                  <div className="flow-root">
                    <div className="flex flex-wrap -m-0.5">
                      <label className="cursor-pointer p-0.5">
                        <div className="sr-only peer" />

                        <label className="cursor-pointer p-0.5">
                          <strong className="border border-black rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-black">
                            {" "}
                            {listing.location}
                          </strong>
                        </label>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </form>
              {/* MAP */}
              <br />
              <div className="leafletContainer">
                <MapContainer
                  style={{ height: "100%", width: "100%" }}
                  center={[listing.geolocation.lat, listing.geolocation.lng]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                  />

                  <Marker
                    position={[
                      listing.geolocation.lat,
                      listing.geolocation.lng,
                    ]}
                  >
                    <Popup>{listing.location}</Popup>
                  </Marker>
                </MapContainer>
              </div>

              {auth.currentUser?.uid !== listing.userRef && (
                <Link
                  to={`/contact/${listing.userRef}?listingName=${listing.brand}&listingLocation=${listing.location}`}
                  className="primaryButton"
                >
                  Contact Car Owner
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Listing;
