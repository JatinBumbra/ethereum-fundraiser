import Web3 from 'web3';
import { createContext, useContext, useState, useEffect } from 'react';
import CampaignContract from '../contracts/build/Campaign.json';
import FactoryContract from '../contracts/build/CampaignFactory.json';

const AppContext = createContext();

const initAlert = {
  color: '',
  message: '',
};

export function AppState({ children }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(initAlert);
  const [factory, setFactory] = useState();
  const [contractsLoaded, setContractsLoaded] = useState(false);
  const [deployedCampaigns, setDeployedCampaigns] = useState();
  const [address, setAddress] = useState();

  const resetAlert = () => setAlert(initAlert);

  // Renders the data from scratch
  const loadUIData = () => {
    setAlert(initAlert);
    setLoading(true);
    loadWeb3().then(loadBlockchainData).finally(setLoading);
  };

  const setContractsNotLoadedAlert = () =>
    setAlert({
      color: 'red',
      message: 'Non-Etherium browser detected. Try MetaMask',
    });

  // Load the web3
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      setContractsNotLoadedAlert();
    }
  };

  const loadBlockchainData = async () => {
    let factoryInstance;
    // load web3
    const web3 = window.web3;
    if (!web3) return;
    // Get account address
    const accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);
    // Get the active network id
    const netId = await web3.eth.net.getId();
    // Load campaign contract
    const campaignData = CampaignContract.networks[netId];
    // Load factory contract
    const factoryData = FactoryContract.networks[netId];
    if (factoryData) {
      factoryInstance = new web3.eth.Contract(
        FactoryContract.abi,
        factoryData.address
      );
      setFactory(factoryInstance);
      // Get the deployed campaigns
      const deployedCampaigns = await factoryInstance.methods
        .getDeployedCampaigns()
        .call();
      // Load the campaigns data
      const campaignData = new Map();
      deployedCampaigns.forEach((item) => {
        campaignData.set(
          item,
          new web3.eth.Contract(CampaignContract.abi, item)
        );
      });
      setDeployedCampaigns(campaignData);
    }
    // If contracts are not deployed, then show error
    if (campaignData && factoryData) {
      setContractsLoaded(true);
    } else {
      setAlert({
        color: 'red',
        message:
          'Contracts not deployed to this network. Switch to Ropsten Network.',
      });
    }
  };

  useEffect(() => {
    loadUIData();
    window.ethereum.on('accountsChanged', loadUIData);
    window.ethereum.on('chainChanged', loadUIData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        alert,
        setAlert,
        resetAlert,
        loading,
        setLoading,
        address,
        factory,
        deployedCampaigns,
        contractsLoaded,
        loadBlockchainData,
        setContractsNotLoadedAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
