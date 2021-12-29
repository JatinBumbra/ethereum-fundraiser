import { useEffect, useState } from 'react';
// Components
import CampaignInfo from '../../../components/campaign-details/CampaignInfo';
import PendingRequests from '../../../components/campaign-details/PendingRequests';
import ContributeForm from '../../../components/campaign-details/ContributeForm';
import YourContributors from '../../../components/campaign-details/YourContributors';
import ScreenLayout from '../../../components/common/ScreenLayout';
// Router
import { useRouter } from 'next/router';
// State
import { useAppContext } from '../../../state';

const commonStyle =
  'border rounded-lg hover:shadow-xl focus-within:shadow-xl transition-all';

const CampaignDetails = () => {
  const { address, deployedCampaigns } = useAppContext();
  const router = useRouter();
  const [data, setData] = useState();
  const [campaign, setCampaign] = useState();

  useEffect(() => {
    const init = async () => {
      const campaign = deployedCampaigns.get(router.query.id);
      const data = {
        _address: campaign._address,
        admin: await campaign.methods.admin().call(),
        title: await campaign.methods.title().call(),
        description: await campaign.methods.description().call(),
        goal: await campaign.methods.goal().call(),
        deadline: await campaign.methods.deadline().call(),
        raisedAmount: await campaign.methods.raisedAmount().call(),
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

  return data ? (
    <ScreenLayout title={data?.title} para={`by ${data?.admin}`}>
      <div className='grid grid-cols-2 pb-10'>
        <div>
          <CampaignInfo commonStyle={commonStyle} data={data} />
          <PendingRequests data={data} />
        </div>
        <div>
          <YourContributors commonStyle={commonStyle} data={data} />
          <ContributeForm
            commonStyle={commonStyle}
            data={data}
            campaign={campaign}
          />
        </div>
      </div>
    </ScreenLayout>
  ) : null;
};

export default CampaignDetails;
