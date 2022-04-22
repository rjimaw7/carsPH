import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase.config";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function EditListing() {
  // eslint-disable-next-line
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    type: "sale",
    brand: "",
    discountedPrice: 0,
    firstOwner: false,
    fueltype: "",
    latitude: 0,
    longitude: 0,
    images: {},
    address: "",
    model: "",
    offer: false,
    regularPrice: 0,
  });

  const {
    type,
    brand,
    discountedPrice,
    firstOwner,
    fueltype,
    latitude,
    longitude,
    images,
    address,
    model,
    offer,
    regularPrice,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const isMounted = useRef(true);

  //   Redirect if listing is not users
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can not edit that listing");
      navigate("/");
    }
  });

  //   Fetch listing to edit
  useEffect(() => {
    setLoading(true);

    const fetchlisting = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data(), address: docSnap.data().location });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    };

    fetchlisting();
  }, [params.listingId, navigate]);

  //   Sets userRef to login user
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images");
    }

    let geolocation = {};
    let location;

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );

      const data = await response.json();

      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location =
        data.status === "ZERO_RESULTS"
          ? undefined
          : data.results[0]?.formatted_address;

      if (location === undefined || location.includes("undefined")) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      location = address;
    }

    // Store images in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };

    formDataCopy.location = address;
    delete formDataCopy.images;
    delete formDataCopy.address;
    location && (formDataCopy.location = location);
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = doc(db, "listings", params.listingId);
    await updateDoc(docRef, formDataCopy);

    setLoading(false);
    toast.success("Listing saved");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center text-black sm:text-3xl">
            Edit Car Listing
          </h1>

          <form
            onSubmit={onSubmit}
            className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
          >
            <div className="flex justify-evenly">
              <button
                type="button"
                id="type"
                value="sale"
                onClick={onMutate}
                className={type === "sale" ? "formButtonActive" : "formButton"}
              >
                Sell
              </button>
              <button
                type="button"
                id="type"
                value="rent"
                onClick={onMutate}
                className={type === "rent" ? "formButtonActive" : "formButton"}
              >
                Rent
              </button>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">
                {" "}
                Brand{" "}
              </label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={onMutate}
                maxLength="32"
                required
                className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">
                {" "}
                Model{" "}
              </label>
              <input
                id="model"
                type="text"
                value={model}
                onChange={onMutate}
                required
                className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">
                {" "}
                Fuel Type{" "}
              </label>
              <input
                id="fueltype"
                type="text"
                value={fueltype}
                onChange={onMutate}
                required
                className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              />
            </div>
            <label className="text-xs font-medium text-gray-500">
              First Owner{" "}
            </label>
            <div className="flex justify-evenly">
              <button
                type="button"
                id="firstOwner"
                value={true}
                onClick={onMutate}
                className={firstOwner ? "formButtonActive" : "formButton"}
              >
                Yes
              </button>
              <button
                type="button"
                id="firstOwner"
                value={false}
                onClick={onMutate}
                className={
                  !firstOwner && firstOwner !== null
                    ? "formButtonActive"
                    : "formButton"
                }
              >
                No
              </button>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">
                {" "}
                Address:{" "}
              </label>
              <textarea
                rows="4"
                type="text"
                id="address"
                value={address}
                onChange={onMutate}
                className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              ></textarea>
            </div>
            <label className="text-xs font-medium text-gray-500">Offer </label>
            <div className="flex justify-evenly">
              <button
                type="button"
                id="offer"
                value={true}
                onClick={onMutate}
                className={offer ? "formButtonActive" : "formButton"}
              >
                Yes
              </button>
              <button
                type="button"
                id="offer"
                value={false}
                onClick={onMutate}
                className={
                  !offer && offer !== null ? "formButtonActive" : "formButton"
                }
              >
                No
              </button>
            </div>
            <label className="text-xs font-medium text-gray-500">
              {" "}
              regularPrice{" "}
            </label>
            <div className="flex">
              <input
                id="regularPrice"
                type="number"
                value={regularPrice}
                onChange={onMutate}
                maxLength="50"
                minLength="750000000"
                required
                className="block w-50 rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              />
              {type === "rent" && <p className="font-semibold"> $ / Month</p>}
            </div>
            {offer && (
              <>
                <label className="text-xs font-medium text-gray-500">
                  {" "}
                  discountedPrice{" "}
                </label>
                <div className="flex">
                  <input
                    id="discountedPrice"
                    type="number"
                    value={discountedPrice}
                    onChange={onMutate}
                    maxLength="50"
                    minLength="750000000"
                    required
                    className="block w-50 rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                  />
                </div>
              </>
            )}
            <div>
              <label className="text-xs font-medium text-gray-500">
                {" "}
                Images{" "}
              </label>
              <input
                id="images"
                type="file"
                max="6"
                accept=".jpg,.png,.jpeg"
                onChange={onMutate}
                required
                multiple
                className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-black bg-black px-4 py-3 text-base font-medium text-white transition hover:border-black hover:bg-black focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditListing;
