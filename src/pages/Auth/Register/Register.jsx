import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin.jsx";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
            }
          });

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              // console.log('user profile updated done.')
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to eTuitionBd</h3>
      <p className="text-center">Please Register to Continue</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}

          {/* photo image field */}
          <label className="label">Photo</label>

          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />

          {errors.name?.type === "required" && (
            <p className="text-red-500">Photo is required.</p>
          )}

          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have at least one uppercase, at least one lowercase,
              at least one number, and at least one special characters
            </p>
          )}

          {/* Role Selection */}
          <label className="label">Register As</label>
          <select
            {...register("role", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
          </select>


         {/* Phone */}
         <label className="label">Phone Number</label>
         <input
           type="text"
           {...register("phone", { required: true })}
           className="input input-bordered"
           placeholder="Enter your phone number"
         />
         {errors.phone && (
           <p className="text-red-500">Phone number is required.</p>
         )}




          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account{" "}
          <Link
            state={location.state}
            className="text-blue-400 underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;



//   return (
//     <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
//       <h3 className="text-3xl text-center font-bold">Welcome to eTuitionBd</h3>
//       <p className="text-center">Please Register to Continue</p>

//       <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
//         <fieldset className="fieldset space-y-2">
//           {/* Name */}
//           <label className="label">Full Name</label>
//           <input
//             type="text"
//             {...register("name", { required: true })}
//             className="input input-bordered"
//             placeholder="Enter your name"
//           />
//           {errors.name && <p className="text-red-500">Name is required.</p>}

//           {/* Photo */}
//           <label className="label">Photo</label>
//           <input
//             type="file"
//             {...register("photo", { required: true })}
//             className="file-input file-input-bordered"
//           />
//           {errors.photo && <p className="text-red-500">Photo is required.</p>}

//           {/* Email */}
//           <label className="label">Email</label>
//           <input
//             type="email"
//             {...register("email", { required: true })}
//             className="input input-bordered"
//             placeholder="Enter your email"
//           />
//           {errors.email && <p className="text-red-500">Email is required.</p>}

//           {/* Password */}
//           <label className="label">Password</label>
//           <input
//             type="password"
//             {...register("password", {
//               required: true,
//               minLength: 6,
//               pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
//             })}
//             className="input input-bordered"
//             placeholder="Enter your password"
//           />
//           {errors.password?.type === "required" && (
//             <p className="text-red-500">Password is required.</p>
//           )}
//           {errors.password?.type === "minLength" && (
//             <p className="text-red-500">
//               Password must be at least 6 characters long
//             </p>
//           )}
//           {errors.password?.type === "pattern" && (
//             <p className="text-red-500">
//               Must include uppercase, lowercase, number & special character
//             </p>
//           )}

//           {/* Role Selection */}
//           <label className="label">Register As</label>
//           <select
//             {...register("role", { required: true })}
//             className="select select-bordered w-full"
//           >
//             <option value="">Select Role</option>
//             <option value="Student">Student</option>
//             <option value="Tutor">Tutor</option>
//           </select>
//           {errors.role && <p className="text-red-500">Role is required.</p>}

//           {/* Phone */}
//           <label className="label">Phone Number</label>
//           <input
//             type="text"
//             {...register("phone", { required: true })}
//             className="input input-bordered"
//             placeholder="Enter your phone number"
//           />
//           {errors.phone && (
//             <p className="text-red-500">Phone number is required.</p>
//           )}

//           {/* Submit */}
//           <button className="btn btn-primary mt-4 w-full">Register</button>
//         </fieldset>

//         <p className="text-center">
//           Already have an account?{" "}
//           <Link
//             state={location.state}
//             className="text-indigo-500 underline"
//             to="/login"
//           >
//             Login
//           </Link>
//         </p>
//       </form>

//       {/* Google Login */}
//       <SocialLogin />
//     </div>
//   );
// };

// export default Register;
