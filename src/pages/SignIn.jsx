import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <>
      {/* <!-- ====== Forms Section Start --> */}
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div
                className="
               max-w-[525px]
               mx-auto
               text-center
               bg-white
               rounded-lg
               relative
               overflow-hidden
               py-16
               px-10
               sm:px-12
               md:px-[60px]
               "
              >
                <div className="mb-10 md:mb-16 text-center">
                  <h1 className="text-xl font-medium text-gray-900">
                    Welcome Back
                  </h1>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="mb-6">
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={onChange}
                      className="
                        w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                    />
                  </div>
                  <div className="mb-6 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChange}
                      className="
                        w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                    />
                    <img
                      src={visibilityIcon}
                      alt="view"
                      className="showPassword fluid"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  </div>
                  <div className="mb-10">
                    <input
                      type="submit"
                      value="Sign In"
                      className="
                        w-full
                        rounded-md
                        border
                        bordder-primary
                        py-3
                        px-5
                        bg-black
                        text-base text-white
                        cursor-pointer
                        hover:bg-opacity-90
                        transition
                        "
                    />
                  </div>
                </form>
                <p className="text-base mb-6 text-[#adadad]">
                  Sign In With Google
                </p>
                <OAuth />
                <Link
                  to="/forgot-password"
                  className="
                  text-base
                  inline-block
                  mb-2
                  text-[#adadad]
                  hover:underline hover:text-primary
                  "
                >
                  Forgot Password?
                </Link>
                <p className="text-base text-[#adadad]">
                  Not a member yet?{" "}
                  <Link
                    to="/sign-up"
                    className=" text-black underline hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ====== Forms Section End --> */}
    </>
  );
}

export default SignIn;
