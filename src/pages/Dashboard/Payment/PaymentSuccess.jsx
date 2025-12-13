import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();


useEffect(() => {
  if (sessionId) {
    axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
      .then(res => {
        setPaymentInfo(res.data); // ✅ এখন সব info আসবে
      })
      .catch(() => {
        Swal.fire("Error", "Failed to verify payment", "error");
      });
  }
}, [sessionId, axiosSecure]);


return (
  <div className="p-6 text-center">
    
  <h2 className="text-4xl font-bold text-success mb-4">Payment Successful 🎉</h2>
  <p className="text-lg">Transaction ID: <span className="font-mono">{paymentInfo.transactionId}</span></p>
  <p className="text-lg">Tutor: {paymentInfo.tutorName} ({paymentInfo.tutorEmail})</p>
  <p className="text-lg">Tuition: {paymentInfo.subject} ({paymentInfo.class})</p>
  <p className="text-lg">Paid Amount: ${paymentInfo.amount}</p>
  <p className="text-sm text-gray-500 mt-2">Paid At: {new Date(paymentInfo.paidAt).toLocaleString()}</p>
  <p className="mt-4 text-gray-600">Thank you! Your tutor application has been approved.</p>

  <Link to="/dashboard/applied-tutors">
    <button className="btn btn-primary mt-6">Back to My Applications</button>
  </Link>
</div>

  
);
}

export default PaymentSuccess;


//  64-1 Fix Payment entry getting duplicate