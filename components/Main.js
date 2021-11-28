import React from 'react';

const Main = ({ children, title, para }) => {
  return (
    <main className='px-10 py-4 container mx-auto'>
      <div className='mt-4 mb-6'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        {para ? <h3 className='text-md mt-2 text-gray-500'>{para}</h3> : null}
      </div>
      {children}
    </main>
  );
};

export default Main;
