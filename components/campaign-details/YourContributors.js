const YourContributors = ({ commonStyle }) => {
  return (
    <div
      className={`px-8 py-5 ml-10 justify-between items-center mb-4 ${commonStyle}`}
    >
      <h2 className='text-xl font-medium text-gray-500'>Your Contributions</h2>
      <h2 className='text-4xl mt-1 font-bold'>2 ETH</h2>
    </div>
  );
};

export default YourContributors;
