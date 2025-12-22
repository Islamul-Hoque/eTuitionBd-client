import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const AddTuition = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const handleAddTuition = async (data) => {
        const newTuitionInfo = {
            subject: data.subject,
            class: data.class,
            medium: data.medium,
            institution: data.institution,
            location: data.location,
            address: data.address,
            schedule: data.schedule,
            duration: data.duration,
            daysPerWeek: parseInt(data.daysPerWeek),
            budget: parseInt(data.budget),
            studentName: user?.displayName || user?.providerData?.[0]?.displayName,
            // studentPhotoURL: user?.photoURL ||  user?.providerData?.[0]?.photoURL,
            studentEmail: user?.email || user?.providerData?.[0]?.email,
            phone: data.phone,
            additionalRequirements: data.additionalRequirements,
    };

    try {
        const res = await axiosSecure.post("/add-tuition", newTuitionInfo);
        if (res.data.insertedId) {
            toast.success(" New tuition post created successfully!");
            reset();
        }
    } catch (err) {
        toast.error("Failed to create tuition post!");
        console.error(err);
    }
}

  return (
    <div className="px-6 md:px-10 py-6 md:py-10 bg-gray-50">
      <div className=" mx-auto bg-white shadow-lg rounded-lg p-8">
      <h3 className="text-2xl font-bold text-indigo-600 mb-6 text-center">Add Tuition Post</h3>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(handleAddTuition)}>
        <div>
          <label className="label">Subject</label>
          <input type="text" {...register("subject", { required: true })} className="inputField" placeholder="Enter subject (e.g. Mathematics)" />
          {errors.subject && <p className="text-red-500">Subject is required.</p>}
        </div>

        <div>
          <label className="label">Class</label>
          <input type="text" {...register("class", { required: true })} className="inputField" placeholder="Enter class (e.g. Class 9)" />
          {errors.class && <p className="text-red-500">Class is required.</p>}
        </div>

        <div>
          <label className="label">Medium</label>
          <input type="text" {...register("medium", { required: true })} className="inputField" placeholder="Enter medium (e.g. English Version)" />
          {errors.medium && <p className="text-red-500">Medium is required.</p>}
        </div>

        <div>
          <label className="label">Institution</label>
          <input type="text" {...register("institution", { required: true })} className="inputField" placeholder="Enter institution name" />
          {errors.institution && <p className="text-red-500">Institution is required.</p>}
        </div>

        <div>
          <label className="label">Location</label>
          <input type="text" {...register("location", { required: true })} className="inputField" placeholder="Enter city (e.g. Chittagong City)" />
          {errors.location && <p className="text-red-500">Location is required.</p>}
        </div>

        <div>
          <label className="label">Schedule</label>
          <input type="text" {...register("schedule", { required: true })} className="inputField" placeholder="Sat-Mon-Wed, 5PM-7PM" />
          {errors.schedule && <p className="text-red-500">Schedule is required.</p>}
        </div>

        <div>
          <label className="label">Duration</label>
          <input type="text" {...register("duration", { required: true })} className="inputField" placeholder="2 hours per session" />
          {errors.duration && <p className="text-red-500">Duration is required.</p>}
        </div>

        <div>
          <label className="label">Days per Week</label>
          <input type="number" {...register("daysPerWeek", { required: true })} className="inputField" placeholder="Enter number of days per week" />
          {errors.daysPerWeek && <p className="text-red-500">Days per week is required.</p>}
        </div>

        <div>
          <label className="label">Budget</label>
          <input type="number" {...register("budget", { required: true })} className="inputField" placeholder="Enter budget (e.g. 4000)" />
          {errors.budget && <p className="text-red-500">Budget is required.</p>}
        </div>

        <div>
          <label className="label">Phone Number</label>
          <input type="text" {...register("phone", { required: true })} className="inputField" placeholder="Enter your phone number" />
          {errors.phone && <p className="text-red-500">Phone number is required.</p>}
        </div>

        <div className="md:col-span-2">
          <label className="label">Additional Requirements</label>
          <textarea {...register("additionalRequirements", {required: true})} className="textarea inputField" placeholder="Enter any additional requirements" />
          {errors.additionalRequirements && <p className="text-red-500">Additional requirements are required.</p>}
        </div>

        <div>
          <label className="label">Student Name</label>
          <input type="text" value={user?.displayName} readOnly className="inputField" />
        </div>
        <div>
          <label className="label">Student Email</label>
          <input type="email" value={user?.email || user?.providerData?.[0]?.email} readOnly className="inputField" />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold shadow-md mt-3">
            Submit Tuition Post
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddTuition;