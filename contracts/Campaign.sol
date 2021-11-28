// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract Campaign {
    struct Request {
        string description;
        address recipient;
        uint256 value;
        bool isCompleted;
        uint256 numApprovers;
    }

    address public admin;
    mapping(address => uint256) public contributors;
    uint256 public numContributors;
    uint256 public minimumContribution;
    uint256 public goal;
    uint256 public deadline;
    uint256 public raisedAmount = 0;
    string public title;
    string public description;

    Request[] public requests;
    mapping(address => mapping(string => bool)) public approvalsForRequest;

    constructor(
        address _admin,
        string memory _title,
        string memory _description,
        uint256 _minimumContribution,
        uint256 _goal,
        uint256 _deadline
    ) {
        goal = _goal;
        admin = _admin;
        deadline = block.timestamp + _deadline;
        minimumContribution = _minimumContribution;
        title = _title;
        description = _description;
    }

    modifier adminOnly() {
        require(
            msg.sender == admin,
            "Only campaign admin can make this request"
        );
        _;
    }

    function contribute() public payable {
        require(block.timestamp < deadline, "Crowdfunding has ended.");
        require(
            msg.value < minimumContribution,
            "Please send the minimum contribution amount"
        );
        // If msg.sender is a new contributor, then increment the number of contributors
        if (contributors[msg.sender] == 0) {
            numContributors++;
        }
        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getRefund() public {
        address recipient = msg.sender;
        require(
            block.timestamp > deadline &&
                raisedAmount < goal &&
                contributors[recipient] > 0,
            "You are not eligible for refund"
        );
        payable(recipient).transfer(contributors[recipient]);
        contributors[recipient] = 0;
    }

    function createRequest(
        string memory _description,
        address _recipient,
        uint256 _value
    ) public adminOnly {
        require(_value > 0, "Expected value to be atleast 1 Wei");
        Request memory newRequest = Request({
            description: _description,
            recipient: _recipient,
            value: _value,
            isCompleted: false,
            numApprovers: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint256 _requestIndex) public {
        require(
            contributors[msg.sender] > 0,
            "You need to contribute first in order to aprove requests"
        );
        // Find the request
        Request storage request = requests[_requestIndex];
        // Check if the person has already voted or not
        require(
            !approvalsForRequest[msg.sender][request.description],
            "You have already voted for the request"
        );
        // Add the person to approvalsForRequest
        approvalsForRequest[msg.sender][request.description] = true;
        request.numApprovers++;
    }

    function finalizeRequest(uint256 _requestIndex) public adminOnly {
        // Find the request
        Request storage request = requests[_requestIndex];
        // Ensure that the request is not already finalized
        require(
            !request.isCompleted,
            "Request has already been finalized and approved"
        );
        // Ensure that atleast half the contributers have approved
        require(
            request.numApprovers > (numContributors / 2),
            "Not enough approvers have agreed upon this request"
        );

        payable(request.recipient).transfer(request.value);
        request.isCompleted = true;
    }
}
