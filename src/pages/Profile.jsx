import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import ListingItem from "../components/ListingItem";
import profileLogo from "../assets/jpg/profilelogo.png";
import Footer from "../components/Footer";

function Profile() {
  const auth = getAuth();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // eslint-disable-next-line
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };

  return (
    <>
      <div className="flex flex-wrap items-center  justify-center  ">
        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
          <div className=" h-32 overflow-hidden">
            <img
              className="w-full img-responsive"
              src="https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="car"
            />
          </div>
          <div className="flex justify-center px-5  -mt-12">
            <img
              className="h-32 w-32 bg-white p-2 rounded-full   "
              src={profileLogo}
              alt="person"
            />
          </div>
          <div className=" ">
            <div className="text-center px-14">
              <h2 className="text-gray-800 text-3xl font-bold">{name}</h2>
              <p className="text-gray-400 mt-2">{email}</p>
            </div>
            <hr className="mt-6" />
            <div className="flex  bg-gray-50 ">
              <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                <p>
                  <Link to="/create-listing">Create Car Listing</Link>
                </p>
              </div>
              <div className="border"></div>
              <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                <button onClick={onLogout}>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="container mx-auto border-gray-500 mt-6" />

      {/* <!--post icon and title--> */}
      <div className="flex flex-row mt-4 justify-center mr-16">
        <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
          <div className="flex inline-flex">
            <h3 className="text-4xl font-bold sm:text-3xl text-center">
              MY CAR LISTINGS
            </h3>
          </div>
        </div>
      </div>
      {!loading && listings?.length > 0 ? (
        <>
          {listings.map((listing) => (
            <ListingItem
              key={listing.id}
              listing={listing.data}
              id={listing.id}
              onDelete={() => onDelete(listing.id)}
              onEdit={() => onEdit(listing.id)}
            />
          ))}
        </>
      ) : (
        <p className="container mx-auto text-center text-2xl font-extrabold text-gray-900">
          CAR LISTING EMPTY
        </p>
      )}
      <Footer />
    </>
  );
}

export default Profile;
