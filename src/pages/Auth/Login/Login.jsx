import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signInUser, signInGoogle, getJwtToken } = useAuth();
  const [show, setShow] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        getJwtToken(data.email)
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

const handleGoogleSignIn = () => {
  signInGoogle()
    .then(async (result) => {
      const email = result.user?.email || result.user?.providerData?.[0]?.email;

      const userInfo = {
        email,
        displayName: result.user?.displayName,
        photoURL: result.user.photoURL || result.user?.providerData?.[0]?.photoURL,
        phone: ""
      };

      await axiosSecure.post('/users', userInfo).catch(err => {
        if (err.response?.status === 409) {
          console.log(err.response);
        }
      });
      await getJwtToken(email);

      toast.success('Logged in with Google!');
      navigate("/");
    })
    .catch(err => {
      console.error("Google login failed:", err);
    });
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-indigo-50 via-purple-50/0.1 to-white ">
      <div className="w-[88%] md:w-[50%] pb-3 rounded-[0.7rem] overflow-hidden shadow bg-white border border-gray-200 ">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-indigo-500 pt-10"> Login to <span className="text-gradient">eTuitionBd</span></h2>
        <div className="card-body text-gray-800 ">
          <form  onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" {...register("email", { required: true })} className="inputField" placeholder="Email" />
              {errors.email?.type === "required" && <p className="text-red-500">Please enter a valid email address</p>}

              <div className="relative">
                <label className="label">Password</label>
                <input type={ show ? "text" : "password" } {...register("password", { required: true, minLength: 6 })} className="inputField" placeholder="Password" />
                <span onClick={()=> setShow(!show) } className="absolute text-[1rem] right-4 top-[1.9rem] cursor-pointer z-50 " > { show ? <FaEye/> : <IoEyeOff/> }  </span>
                {errors.password?.type === "required" && <p className="text-red-500">Please enter your password</p>}
              </div>

              <button className="w-full btn bg-indigo-500 text-white hover:bg-indigo-700 shadow-md mt-3">Login</button>
            </fieldset>
          </form>
          <p className="text-gray-500  text-center"> Don’t have an account?{" "} <Link state={location.state} to="/register" className="text-gradient font-medium hover:text-indigo-600 hover:link"> Sign Up </Link></p>

          <div className="flex items-center gap-3 ">
              <hr className="flex-1 border-gray-200" />
              <span className="text-gray-500  text-sm"> Or </span>
              <hr className="flex-1 border-gray-200" />
          </div>

          <button onClick={handleGoogleSignIn} className="btn w-full bg-white text-black rounded-md border border-[#e5e5e5] flex items-center justify-center gap-2"> 
            <FcGoogle size={18}/>Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;