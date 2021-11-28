import Link from 'next/link';
import Button from '../common/Button';
import { useRouter } from 'next/router';

const PendingRequests = () => {
  const router = useRouter();

  return (
    <div className='py-6 my-4 border-t'>
      <h2 className='text-2xl font-semibold'>Pending Requests</h2>
      <table className='mt-6 mb-4 border'>
        <thead className='border-b-2 border-gray-200 font-semibold'>
          <td className='p-3'>ID</td>
          <td className='p-3'>Description</td>
          <td className='p-3'>Amount</td>
          <td className='p-3'>Approvals</td>
        </thead>
        <tbody>
          <tr className='border-b border-gray-200 hover:bg-indigo-50'>
            <td className='p-3'>1</td>
            <td className='p-3'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, consequuntur.
            </td>
            <td className='p-3'>10 ETH</td>
            <td className='p-3'>100/300</td>
          </tr>
          <tr className='border-b border-gray-200 hover:bg-indigo-50'>
            <td className='p-3'>2</td>
            <td className='p-3'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, consequuntur.
            </td>
            <td className='p-3'>10 ETH</td>
            <td className='p-3'>100/300</td>
          </tr>
        </tbody>
      </table>
      <Link href={`/campaign-details/${router.query.id}/requests`}>
        <Button>View Requests</Button>
      </Link>
    </div>
  );
};

export default PendingRequests;
