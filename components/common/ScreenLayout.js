import Link from 'next/link';
import Button from './Button';

const ScreenLayout = ({ children, title, para }) => {
  return (
    <>
      <header className='border-b-2'>
        <div className='flex justify-between items-center container mx-auto px-10 py-2'>
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
      <main className='px-10 py-4 container mx-auto'>
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
