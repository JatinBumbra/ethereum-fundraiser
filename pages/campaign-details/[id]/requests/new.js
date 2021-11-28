import { useState } from 'react';
import Input from '../../../../components/common/Input';
import Button from '../../../../components/common/Button';
import ScreenLayout from '../../../../components/common/ScreenLayout';

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
  const [form, setForm] = useState(initForm);

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
        <Button disabled={!Object.values(form).every((i) => i.value)} fullWidth>
          Create
        </Button>
      </div>
    </ScreenLayout>
  );
};

export default NewRequest;
