import { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Main from '../components/Main';

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
    <>
      <Header />
      <Main title='Create a Campaign'>
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
            disabled={!Object.values(form).every((i) => i.value)}
            fullWidth
          >
            Create
          </Button>
        </div>
      </Main>
    </>
  );
}
