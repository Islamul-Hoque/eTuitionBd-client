import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [authError, setAuthError] = React.useState("");

    const { registerUser, updateUserProfile, signInGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
        .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios.post(image_API_URL, formData).then((res) => {
            const photoURL = res.data.data.url;
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: photoURL,
                role: data.role, 
                phone: data.phone,
            };
            axiosSecure.post("/users", userInfo).then((res) => {
                if (res.data.insertedId) {
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

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                navigate(location?.state || "/");
                toast.success('Signed up with Google successfully!')
                // create user in the database
                const userInfo = {
                    email: result.user?.email || result.user?.providerData?.[0]?.email,
                    displayName: result.user?.displayName,
                    photoURL: result.user?.photoURL || result.user?.providerData?.[0]?.photoURL,
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
    <div className="flex justify-center items-center min-h-screen pt-12 pb-16 ">
        <div className="w-[88%] md:w-[50%] pb-3 rounded-[0.7rem]  overflow-hidden shadow bg-white  border border-gray-200 ">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-indigo-500 pt-10"> Sign Up for <span className="text-gradient">eTuitionBd</span></h2>   
            <div className="card-body text-gray-800 ">
                <form onSubmit={handleSubmit(handleRegistration)}>
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

                        {/* <div><a className="link link-hover">Forgot password?</a></div> */}

                        {authError && <p className="text-red-500 text-[0.8rem]">{authError}</p>}
                        <button className="w-full btn bg-indigo-500 text-white hover:bg-indigo-700 shadow-md mt-3">Register</button>
                    </fieldset>
                </form>

                <p className="text-gray-500  text-center">Already have an account? <Link to="/login" state={location.state}  className="text-gradient font-medium hover:text-indigo-600 hover:link" >  Login </Link></p>

                <div className="flex items-center gap-3 ">
                    <hr className="flex-1 border-gray-200" />
                    <span className="text-gray-500  text-sm"> Or </span>
                    <hr className="flex-1 border-gray-200" />
                </div>

                <button onClick={handleGoogleSignIn} className="btn w-full bg-white text-black rounded-md border border-[#e5e5e5] flex items-center justify-center gap-2"> 
                    <FcGoogle size={18}/>Sign Up with Google
                </button>

            </div>
        </div>
    </div>
)
}

export default Register;