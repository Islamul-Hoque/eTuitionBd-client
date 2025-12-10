import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin.jsx";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // navigate(location?.state || "/");
        navigate( "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
    <div className="w-[88%] md:w-[40%] pb-3 rounded-[0.7rem] overflow-hidden shadow bg-white border border-gray-200">
      <h3 className="text-3xl text-center">Welcome back</h3>
      <p className="text-center">Please Login</p>
        <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" {...register("email", { required: true })} className="input w-full" placeholder="Email" />
            {errors.email?.type === "required" && <p className="text-red-500">Email is required</p>}

            <label className="label">Password</label>
            <input type="password" {...register("password", { required: true, minLength: 6 })} className="input w-full" placeholder="Password" />
            {errors.password?.type === "minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>}

            <div><a className="link link-hover">Forgot password?</a></div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          <p>New to eTuitionBd <Link state={location.state} className="text-blue-400 underline" to="/register">Register</Link></p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
