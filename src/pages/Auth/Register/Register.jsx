import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin.jsx";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [authError, setAuthError] = React.useState("");

    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
        .then(() => {
        // 1. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get the ul
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios.post(image_API_URL, formData).then((res) => {
            const photoURL = res.data.data.url;

        // create user in the database
        const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
            role: data.role, 
            phone: data.phone,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
                console.log("user created in the database");
                toast.success(`🎉 Welcome ${data.name}, your account has been created!`);
            }
        });

        // update user profile to firebase
        const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
        };

        updateUserProfile(userProfile)
            .then(() => {
            //   console.log('user profile updated done.')
                navigate(location?.state || "/");
            })
            .catch((error) => {
                toast.error("Profile update failed!");
                console.log(error)
            });
        });
    })
    .catch((error) => {
        if (error.code === "auth/email-already-in-use") {setAuthError("This email is already registered!");
        } else if (error.code === "auth/weak-password") { setAuthError("Password should be at least 6 characters.");
        } else {setAuthError("Something went wrong. Please try again later.");}
});

};

return (
  <div className="py-16 bg-gray-100">
  <div className="card bg-base-100 w-[85%] md:w-[45%] mx-auto shadow-2x">
    <h3 className="text-3xl pt-3 text-center">Welcome to eTuitionBd</h3>
    <p className="text-center">Please Register to Continue</p>
    <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
      <fieldset className="fieldset">
        <label className="label">Name</label>
        <input type="text" {...register("name", { required: true })} className="input w-full" placeholder="Your Name" />
        {errors.name?.type === "required" && <p className="text-red-500">Name is required.</p>}

        <label className="label">Photo</label>
        <input type="file" {...register("photo", { required: true })} className="file-input w-full" placeholder="Your Photo" />
        {errors.photo?.type === "required" && <p className="text-red-500">Photo is required.</p>}

        <label className="label">Email</label>
        <input type="email" {...register("email", { required: true })} className="input w-full" placeholder="Email" />
        {errors.email?.type === "required" && <p className="text-red-500">Email is required.</p>}

        <label className="label">Password</label>
        <input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, })}  className="input w-full" placeholder="Password" />
            {errors.password?.type === "required" && <p className="text-red-500">Password is required.</p>}
            {errors.password?.type === "minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>}
            {errors.password?.type === "pattern" && <p className="text-red-500">Password must contain an uppercase letter, a lowercase letter, a number, and a special character.</p>}


        <label className="label">Register As</label>
        <select {...register("role", { required: true })} className="select  w-full">
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">Role is required.</p>}

        <label className="label">Phone Number</label>
        <input type="text" {...register("phone", { required: true })} className="input w-full" placeholder="Enter your phone number" />
        {errors.phone && <p className="text-red-500">Phone number is required.</p>}

        <div><a className="link link-hover">Forgot password?</a></div>

        {authError && <p className="text-red-500 text-[0.8rem]">{authError}</p>}
        <button className="btn btn-neutral mt-4">Register</button>
      </fieldset>

      {/* <p>Already have an account <Link state={location.state} className="text-blue-400 underline" to="/login">Login</Link></p> */}
        <p className="text-gray-500 text-center">Already have an account? <Link state={location.state} className="text-blue-400 underline" to="/login">  Login </Link></p>
    </form>
    <SocialLogin />
  </div>
  </div>
);
}

export default Register;