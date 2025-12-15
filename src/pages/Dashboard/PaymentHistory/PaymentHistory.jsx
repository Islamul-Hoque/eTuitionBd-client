import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="px-6 md:px-10 py-6 md:py-10">
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center"> My Payment History </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-50 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2"> Total Payments </h3>
          <p className="text-3xl font-bold text-indigo-700"> {payments.length} </p>
        </div>

        <div className="bg-green-50 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-green-600 mb-2"> Total Payments Amount </h3>
          <p className="text-3xl font-bold text-green-700"> {payments.reduce((sum, pay) => sum + pay.amount, 0)} USD</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4"> Successful Transactions </h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Tutor</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Amount (USD)</th>
                <th>Date</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                    <td>{index + 1}</td>
                    <td>{pay.tutorName} ({pay.tutorEmail})</td>
                    <td>{pay.subject}</td>
                    <td>{pay.class}</td>
                    <td className="text-indigo-600 font-semibold">{pay.amount}</td>
                    <td>
                    {new Date(pay.paidAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>{pay.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
