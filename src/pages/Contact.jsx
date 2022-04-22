import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function Contact() {
  const [message, setMesssage] = useState("");
  const [landlord, setLandlord] = useState(null);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    };

    getLandLord();
  }, [params.landlordId]);

  const onChange = (e) => setMesssage(e.target.value);

  return (
    <>
      <main>
        <h2 className="container mx-auto text-center w-full text-3xl font-bold leading-tight">
          Contact Car Owner
        </h2>
        {landlord !== null && (
          <section className="p-6 dark:text-coolGray-100">
            <form className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow dark:bg-coolGray-900 ng-untouched ng-pristine ng-valid">
              <div>
                <textarea
                  id="message"
                  type="text"
                  placeholder="Message..."
                  value={message}
                  onChange={onChange}
                  className="block w-full h-f p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-coolGray-800"
                ></textarea>
              </div>
              <div>
                <a
                  href={`mailto:${landlord.email}?Subject=${searchParams.get(
                    "listingName"
                  )}&body=${message}`}
                >
                  <button
                    type="button"
                    className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 dark:bg-black text-white "
                  >
                    Send
                  </button>
                </a>
              </div>
            </form>
          </section>
        )}
        <Footer />
      </main>
    </>
  );
}

export default Contact;
