import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signInUser, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
      const axiosSecure = useAxiosSecure();

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        navigate(location?.state || "/");
        // navigate( "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
        .then(result => {
          navigate(location?.state || "/");
          toast.success('Logged in with Google!');
            // create user in the database
            const userInfo = {
                email: result.user?.email || result.user?.providerData?.[0]?.email,
                displayName: result.user?.displayName,
                photoURL: result.user.photoURL || result.user?.providerData?.[0]?.photoURL,
                role: "Student",
                phone: ""
            }
            axiosSecure.post('/users', userInfo)
                .then(res => {
                  navigate(location?.state || "/");
                })
        })
        .catch(err => {
          if (err.response?.status === 409) { 
            navigate(location?.state || "/"); 
          } 
        })
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-[88%] md:w-[50%] pb-3 rounded-[0.7rem] overflow-hidden shadow bg-white border border-gray-200 ">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-indigo-500 pt-10"> Login to <span className="text-gradient">eTuitionBd</span></h2>
        <div className="card-body text-gray-800 ">
          <form  onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" {...register("email", { required: true })} className="input w-full" placeholder="Email" />
              {errors.email?.type === "required" && <p className="text-red-500">Email is required</p>}

              <label className="label">Password</label>
              <input type="password" {...register("password", { required: true, minLength: 6 })} className="input w-full" placeholder="Password" />
              {errors.password?.type === "minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>}

              <div><a className="link link-hover">Forgot password?</a></div>
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