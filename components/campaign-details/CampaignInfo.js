const CampaignInfo = ({ commonStyle, data }) => {
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <div className={`${commonStyle} px-6 py-4 bg-indigo-600 text-white`}>
          <h3 className='opacity-70'>Funding Goal</h3>
          <h1 className='text-4xl font-bold mt-1'>
            {window.web3.utils.fromWei(data?.goal || '0')} ETH
          </h1>
        </div>
        <div className={`${commonStyle} px-6 py-4`}>
          <h3 className='opacity-70'>Raised Amount</h3>
          <h1 className='text-4xl font-bold mt-1'>
            {window.web3.utils.fromWei(data?.raisedAmount || '0')} ETH
          </h1>
        </div>
      </div>
      <div className='py-6 my-4 mt-4'>
        <h2 className='text-2xl font-semibold mb-2'>About the Project</h2>
        <p className='text-gray-500'>{data?.description}</p>
      </div>
    </>
  );
};

export default CampaignInfo;
