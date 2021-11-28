import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ScreenLayout from '../components/common/ScreenLayout';

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
  const [form, setForm] = useState(initForm);

  const handleChange = (e) =>
    setForm((prev) => {
      prev[e.target.name].value = e.target.value;
      return { ...prev };
    });

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
      <div className='py-3'>
        <Button disabled={!Object.values(form).every((i) => i.value)} fullWidth>
          Create
        </Button>
      </div>
    </ScreenLayout>
  );
}
