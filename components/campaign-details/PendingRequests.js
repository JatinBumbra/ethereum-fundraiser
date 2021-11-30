import Link from 'next/link';
import Button from '../common/Button';
import { useRouter } from 'next/router';

const PendingRequests = ({ data }) => {
  const router = useRouter();

  return (
    <div className='py-6 my-4 border-t'>
      <h2 className='text-2xl font-semibold'>Pending Requests</h2>
      <table className='mt-6 mb-4 border'>
        <thead className='border-b-2 border-gray-200 font-semibold text-left'>
          <tr>
            <th className='p-3'>Description</th>
            <th className='p-3'>Amount</th>
            <th className='p-3'>Approvals</th>
          </tr>
        </thead>
        <tbody>
          {data?.requests.filter((req) => !req.isCompleted).length ? (
            data?.requests
              .filter((req) => !req.isCompleted)
              .map((req, index) => (
                <tr
                  className='border-b border-gray-200 hover:bg-indigo-50'
                  key={index}
                >
                  <td className='p-3'>{req.description}</td>
                  <td className='p-3 text-center'>
                    {window.web3.utils.fromWei(req.value || '0')} ETH
                  </td>
                  <td className='p-3 text-center'>
                    {req.numApprovers} / {data?.numContributors}
                  </td>
                </tr>
              ))
          ) : (
            <div className='p-2 text-center'>No Pending Requests</div>
          )}
        </tbody>
      </table>
      <Link href={`/campaign-details/${router.query.id}/requests`}>
        <Button>View Requests</Button>
      </Link>
    </div>
  );
};

export default PendingRequests;
