import { useEffect, useState } from 'react';
// Components
import Link from 'next/link';
import Button from '../../../../components/common/Button';
import ScreenLayout from '../../../../components/common/ScreenLayout';
// Router
import { useRouter } from 'next/router';
// State
import { useAppContext } from '../../../../state';

const CampaignRequests = () => {
  const { address, deployedCampaigns } = useAppContext();
  const router = useRouter();
  const [data, setData] = useState();
  const [campaign, setCampaign] = useState();

  useEffect(() => {
    const init = async () => {
      const campaign = deployedCampaigns.get(router.query.id);
      const data = {
        _address: campaign._address,
        numContributors: await campaign.methods.numContributors().call(),
        minimumContribution: await campaign.methods
          .minimumContribution()
          .call(),
        myContributions: await campaign.methods.contributors(address).call(),
        requests: await campaign.methods.getRequests().call(),
      };
      setData(data);
      setCampaign(campaign);
    };
    deployedCampaigns && init();
  }, [deployedCampaigns, router]);

  const approveRequest = async (e) => {
    await campaign.methods.approveRequest(e.target.id).send({ from: address });
  };

  const finalizeRequest = async (e) => {
    await campaign.methods.finalizeRequest(e.target.id).send({ from: address });
  };

  return (
    <ScreenLayout title='Requests'>
      <div className='flex justify-start'>
        <Link href={`/campaign-details/${router.query.id}/requests/new`}>
          <Button>New Request</Button>
        </Link>
      </div>
      <table className='my-4 border'>
        <thead className='border-b-2 border-gray-200 font-semibold text-left'>
          <tr>
            <th className='p-3'>Description</th>
            <th className='p-3 text-center'>Amount</th>
            <th className='p-3'>Recipeint</th>
            <th className='p-3 text-center'>Approvals</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.requests.map((req, index) => (
            <tr
              className={`border-b border-gray-200 hover:bg-indigo-50 ${
                req.isCompleted ? 'bg-green-50 hover:bg-green-50' : ''
              }`}
              key={index}
            >
              <td className='p-3'>{req.description}</td>
              <td className='p-3 text-center'>
                {window.web3.utils.fromWei(req.value || '0')} ETH
              </td>
              <td className='p-3 break-words'>{req.recipient}</td>
              <td className='p-3 text-center'>
                {req.numApprovers} / {data?.numContributors}
              </td>
              <td
                className={`${
                  req.isCompleted ? 'cursor-not-allowed opacity-50' : ''
                } p-2 bg-green-100 cursor-pointer hover:bg-green-200 active:bg-green-300 transition-all text-green-800`}
              >
                <button
                  id={index}
                  disabled={req.isCompleted}
                  onClick={approveRequest}
                  className='disabled:cursor-not-allowed'
                >
                  Approve
                </button>
              </td>
              <td
                className={`${
                  req.isCompleted ? 'cursor-not-allowed opacity-50' : ''
                } p-2 bg-yellow-100 cursor-pointer hover:bg-yellow-200 active:bg-yellow-300 transition-all text-yellow-800`}
              >
                <button
                  id={index}
                  disabled={req.isCompleted}
                  onClick={finalizeRequest}
                  className='disabled:cursor-not-allowed'
                >
                  Finalize
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScreenLayout>
  );
};

export default CampaignRequests;
