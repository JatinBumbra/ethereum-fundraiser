import React from 'react';
import Header from '../../components/common/Header';
import Main from '../../components/common/Main';
import CampaignInfo from '../../components/campaign-details/CampaignInfo';
import PendingRequests from '../../components/campaign-details/PendingRequests';
import ContributeForm from '../../components/campaign-details/ContributeForm';
import YourContributors from '../../components/campaign-details/YourContributors';

const commonStyle =
  'border rounded-lg hover:shadow-xl focus-within:shadow-xl transition-all';

const CampaignDetails = () => {
  return (
    <>
      <Header />
      <Main title='Campaign Title' para='by 0x00'>
        <div className='grid grid-cols-2 pb-10'>
          <div>
            <CampaignInfo commonStyle={commonStyle} />
            <PendingRequests />
          </div>
          <div>
            <YourContributors commonStyle={commonStyle} />
            <ContributeForm commonStyle={commonStyle} />
          </div>
        </div>
      </Main>
    </>
  );
};

export default CampaignDetails;
