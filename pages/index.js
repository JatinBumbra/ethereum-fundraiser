import Link from 'next/link';
import Header from '../components/common/Header';
import Main from '../components/common/Main';

export default function Home() {
  const array = new Array(4).fill(true);

  return (
    <>
      <Header />
      <Main
        title='Open Campaigns'
        para='Click on a campaign to view full details and support the project
            creator by donating some crypto'
      >
        <div className='grid grid-cols-3 gap-4'>
          {array.map((i, index) => (
            <Link key={index} href={`campaign-details/${index}`}>
              <div
                className={`border border-gray-300 rounded-md p-4 cursor-pointer transition-all hover:shadow-2xl hover:border-indigo-600 active:bg-gray-100`}
              >
                <h2 className='text-xl text-gray-900 font-semibold'>
                  Project Title
                </h2>
                <p className={`text-indigo-600 text-sm mt-1 font-semibold`}>
                  100% raised
                </p>
                <p className='text-gray-400 text-sm'>by 0x00</p>
                <p className='text-gray-500 text-sm mt-3'>
                  Project description Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Commodi aut in corrupti est dignissimos
                  repellendus ipsum eum
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Main>
    </>
  );
}
