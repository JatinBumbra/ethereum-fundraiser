const Campaign = artifacts.require('Campaign');
const CampaignFactory = artifacts.require('CampaignFactory');

module.exports = async function (deployer, network, accounts) {
  deployer.deploy(CampaignFactory);
  deployer.deploy(
    Campaign,
    accounts[0],
    'Genesis title',
    'Genesis description',
    1,
    0,
    0
  );
};
