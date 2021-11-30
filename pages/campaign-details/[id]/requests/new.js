import { useState } from 'react';
// Components
import Input from '../../../../components/common/Input';
import Button from '../../../../components/common/Button';
import ScreenLayout from '../../../../components/common/ScreenLayout';
// Router
import { useRouter } from 'next/router';
// State
import { useAppContext } from '../../../../state';

const initForm = {
  description: {
    label: 'Description',
    value: '',
  },
  amount: {
    label: 'Amount (in ETH)',
    value: '',
    type: 'number',
  },
  recipient: {
    label: 'Recipient Address',
    value: '',
  },
};

const NewRequest = () => {
  const router = useRouter();
  const { address, deployedCampaigns, loading, setLoading, setAlert } =
    useAppContext();
  const [form, setForm] = useState(initForm);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await deployedCampaigns
        .get(router.query.id)
        .methods.createRequest(
          form.description.value,
          form.recipient.value,
          window.web3.utils.toWei(form.amount.value || '0')
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
    } catch (error) {
      setAlert({
        color: 'red',
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm((prev) => {
      prev[e.target.name].value = e.target.value;
      return { ...prev };
    });

  return (
    <ScreenLayout title='New Request'>
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
      <div className='py-3'>
        <Button
          disabled={!Object.values(form).every((i) => i.value) || loading}
          fullWidth
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>
    </ScreenLayout>
  );
};

export default NewRequest;
