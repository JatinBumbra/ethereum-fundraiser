import Link from 'next/link';
import { useAppContext } from '../../state';
import Button from './Button';

const ScreenLayout = ({ children, title, para }) => {
  const { alert, resetAlert } = useAppContext();

  return (
    <>
      <p className='bg-red-500'></p>
      <p className='bg-green-500'></p>
      <p className='bg-yellow-500'></p>
      {alert?.message ? (
        <div
          className={`bg-${alert.color}-500 text-white p-2 text-sm flex items-center`}
        >
          <p className='text-center flex-1 px-10'>{alert.message}</p>
          <span
            className='mr-2 underline cursor-pointer text-xs'
            onClick={resetAlert}
          >
            Close
          </span>
        </div>
      ) : null}
      <header className='border-b-2'>
        <div className='flex justify-between items-center lg:container mx-auto px-5 md:px-10 py-2'>
          <Link href='/'>
            <h1 className='text-lg font-medium cursor-pointer text-gray-500'>
              CryptoRaiser
            </h1>
          </Link>
          <Link href='/create-campaign'>
            <Button>Create a Campaign</Button>
          </Link>
        </div>
      </header>
      <main className='lg:container mx-auto px-5 md:px-10 py-4'>
        <div className='mt-4 mb-6'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          {para ? <h3 className='text-md mt-2 text-gray-500'>{para}</h3> : null}
        </div>
        {children}
      </main>
    </>
  );
};

export default ScreenLayout;
