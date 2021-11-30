import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ScreenLayout from '../components/common/ScreenLayout';
import { useAppContext } from '../state';

const initForm = {
  title: {
    label: 'Title',
    value: '',
  },
  description: {
    label: 'Description',
    value: '',
  },
  minContribution: {
    label: 'Minimum Contribution (in ETH)',
    value: '',
    type: 'number',
  },
  goal: {
    label: 'Funding Goal (in ETH)',
    value: '',
    type: 'number',
  },
  deadline: {
    label: 'Deadline',
    value: '',
    type: 'date',
    min: Date.now(),
  },
};

export default function CreateCampaign() {
  const {
    factory,
    loading,
    address,
    setAlert,
    setLoading,
    contractsLoaded,
    loadBlockchainData,
    setContractsNotLoadedAlert,
  } = useAppContext();

  const [form, setForm] = useState(initForm);

  const handleChange = (e) =>
    setForm((prev) => {
      prev[e.target.name].value = e.target.value;
      return { ...prev };
    });

  const handleCreate = async () => {
    // If contracts are not loaded, then we return back
    if (!contractsLoaded) return setContractsNotLoadedAlert();
    setLoading(true);
    try {
      await factory.methods
        .createCampaign(
          form.title.value,
          form.description.value,
          window.web3.utils.toWei(form.minContribution.value),
          window.web3.utils.toWei(form.goal.value),
          new Date(form.deadline.value).getTime()
        )
        .send({ from: address })
        .on('transactionHash', () => {
          setAlert({
            color: 'yellow',
            message: 'Creating your campaign...',
          });
        })
        .on('confirmation', () => {
          setAlert({
            color: 'green',
            message: 'Campaign successfully created.',
          });
        })
        .on('error', () => {
          setAlert({
            color: 'red',
            message: 'Unable to create campaign.',
          });
        });
      setForm(initForm);
      loadBlockchainData();
    } catch (error) {
      setAlert({
        color: 'red',
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout title='Create a Campaign'>
      {Object.entries(form).map(([key, value]) => (
        <Input
          label={value.label}
          key={key}
          name={key}
          type={value.type}
          min={value.min}
          onChange={handleChange}
        />
      ))}
      <div className='py-3' onClick={handleCreate}>
        <Button
          disabled={!Object.values(form).every((i) => i.value) || loading}
          fullWidth
        >
          Create
        </Button>
      </div>
    </ScreenLayout>
  );
}
