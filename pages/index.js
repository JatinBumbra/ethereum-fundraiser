import Link from 'next/link';
import ScreenLayout from '../components/common/ScreenLayout';
import { useAppContext } from '../state';

export default function Home() {
  const { campaignData } = useAppContext();

  return (
    <ScreenLayout
      title='Open Campaigns'
      para='Click on a campaign to view full details and support the project
        creator by donating some crypto'
    >
      {!campaignData || !campaignData.length ? (
        <div>
          <h1 className='text-2xl'>No Campaigns are currently present</h1>
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 break-words'>
          {campaignData.map((campaign) => (
            <Link
              key={campaign._address}
              href={`campaign-details/${campaign._address}`}
            >
              <div
                className={`border border-gray-300 rounded-md p-4 cursor-pointer transition-all hover:shadow-2xl hover:border-indigo-600 active:bg-gray-100`}
              >
                <h2 className='text-xl text-gray-900 font-semibold'>
                  {campaign.title}
                </h2>
                <p className={`text-indigo-600 text-sm mt-1 font-semibold`}>
                  {(Number(campaign.raisedAmount) / Number(campaign.goal)) *
                    100}
                  % raised
                </p>
                <p className='text-gray-400 text-sm'>by {campaign.admin}</p>
                <p className='text-gray-500 text-sm mt-3'>
                  {campaign.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </ScreenLayout>
  );
}
