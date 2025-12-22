import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ReportsAnalytics = () => {
    const axiosSecure = useAxiosSecure();
    const { data: reports = { totalEarnings: 0, transactions: [] } } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => { const res = await axiosSecure.get('/admin/reports');
        return res.data;
    },
    });

    const avgTransaction = reports.transactions.length > 0 
        ? (reports.totalEarnings / reports.transactions.length).toFixed(2) : 0;

    return (
        <div className="px-6 md:px-10 py-6 md:py-10">
            <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">  Reports & Analytics </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-indigo-50 shadow rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-2"> Total Platform Earnings </h3>
                    <p className="text-3xl font-bold text-indigo-700"> {reports.totalEarnings}{' '}
                        <span className="uppercase"> {reports.transactions[0]?.currency || 'usd'}  </span>
                    </p>
                </div>

            <div className="bg-green-50 shadow rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-green-600 mb-2"> Successful Transactions </h3>
                <p className="text-3xl font-bold text-green-700"> {reports.transactions.length} </p>
            </div>

            <div className="bg-yellow-50 shadow rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-yellow-600 mb-2"> Avg. Transaction Amount  </h3>
                <p className="text-3xl font-bold text-yellow-700"> {avgTransaction}{' '}
                    <span className="uppercase"> {reports.transactions[0]?.currency || 'usd'}  </span>
                </p>
            </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-indigo-500 mb-4"> Successful Transaction History</h3>
            <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        {/* <th>#</th> */}
                        <th>Student</th>
                        <th>Tutor</th>
                        <th>Subject</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Transaction ID</th>
                    </tr>
                </thead>
            <tbody>
                {reports.transactions.map((tx) => (
                <tr key={tx._id}>
                    {/* <td>{index + 1}</td> */}
                    <td>{tx.studentEmail} </td>
                    <td>{tx.tutorName} ({tx.tutorEmail})
                  </td>
                  <td>{tx.subject}</td>
                  <td className="text-indigo-500 font-semibold">
                    {tx.amount} <span className='uppercase'>{tx.currency}</span>
                  </td>
                  <td>
                    {new Date(tx.paidAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>{tx.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;