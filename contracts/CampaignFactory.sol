// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(
        string memory _title,
        string memory _description,
        uint _minimumContribution,
        uint _goal, 
        uint _deadline) 
    public {
        Campaign newCampaign = new Campaign(msg.sender, _title, _description,_minimumContribution, _goal, _deadline);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(Campaign[] memory) {
        return deployedCampaigns;
    }   
}