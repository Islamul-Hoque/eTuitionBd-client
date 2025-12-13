import React from "react";
import { Link } from "react-router"; // ✅ correct import

const PaymentCancelled = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-error mb-4">
  Payment Cancelled 
</h2>

      <p className="text-gray-600 mb-6">
        Your payment was cancelled. Please try again to complete your tutor application.
      </p>

      <Link to="/dashboard/applied-tutors">
  <button className="btn btn-primary mt-6">Try Again</button>
</Link>

    </div>
  );
};

export default PaymentCancelled;
