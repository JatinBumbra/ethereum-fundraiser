import Link from 'next/link';
import Button from '../../../../components/common/Button';
import Header from '../../../../components/common/Header';
import Main from '../../../../components/common/Main';
import { useRouter } from 'next/router';

const CampaignRequests = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <Main title='Requests'>
        <div className='flex justify-start'>
          <Link href={`/campaign-details/${router.query.id}/requests/new`}>
            <Button>New Request</Button>
          </Link>
        </div>
        <table className='my-4 border'>
          <thead className='border-b-2 border-gray-200 font-semibold'>
            <td className='p-3'>ID</td>
            <td className='p-3'>Description</td>
            <td className='p-3'>Amount</td>
            <td className='p-3'>Recipeint</td>
            <td className='p-3'>Approvals</td>
            <td></td>
            <td></td>
          </thead>
          <tbody>
            <tr className='border-b border-gray-200 hover:bg-indigo-50 transition-all'>
              <td className='p-3'>1</td>
              <td className='p-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos, consequuntur. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Omnis, modi?
              </td>
              <td className='p-3'>10 ETH</td>
              <td className='p-3'>0x000000</td>
              <td className='p-3'>100/300</td>
              <td className='p-3 bg-green-100 cursor-pointer hover:bg-green-200 active:bg-green-300 transition-all text-green-800'>
                Approve
              </td>
              <td className='p-3 bg-red-100 cursor-pointer hover:bg-red-200 active:bg-red-300 transition-all text-red-800'>
                Reject
              </td>
            </tr>
            <tr className='border-b border-gray-200 hover:bg-indigo-50 transition-all'>
              <td className='p-3'>1</td>
              <td className='p-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos, consequuntur.
              </td>
              <td className='p-3'>10 ETH</td>
              <td className='p-3'>0x000000</td>
              <td className='p-3'>100/300</td>
              <td className='p-3 bg-green-100 cursor-pointer hover:bg-green-200 active:bg-green-300 transition-all text-green-800'>
                Approve
              </td>
              <td className='p-3 bg-red-100 cursor-pointer hover:bg-red-200 active:bg-red-300 transition-all text-red-800'>
                Reject
              </td>
            </tr>
          </tbody>
        </table>
      </Main>
    </>
  );
};

export default CampaignRequests;
