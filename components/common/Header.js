import Link from 'next/link';
import Button from './Button';

const Header = () => {
  return (
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
  );
};

export default Header;
