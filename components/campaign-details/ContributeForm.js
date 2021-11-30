import Input from '../common/Input';
import Button from '../common/Button';
import { useState } from 'react';
import { useAppContext } from '../../state';

const ContributeForm = ({ commonStyle, data, campaign }) => {
  const { address } = useAppContext();
  const [input, setInput] = useState();

  const handleChange = (e) => setInput(e.target.value);

  const handleContribute = async () => {
    try {
      await campaign.methods
        .contribute()
        .send({ from: address, value: window.web3.utils.toWei(input) });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className={`p-8 ml-10 ${commonStyle}`}>
      <h2 className='text-2xl font-semibold'>Contribute to this Campaign</h2>
      <p className={`text-lg font-bold text-indigo-600`}>
        {data?.numContributors} Contributors
      </p>
      <p className='mt-1 mb-8 text-gray-500'>
        Become a contributor and support the project. You can also make active
        decisions on how the money is being spent.
      </p>
      <Input
        type='number'
        label={`Minimum Contribution: ${window.web3.utils.fromWei(
          data?.minimumContribution || '0'
        )} ETH`}
        value={input}
        onChange={handleChange}
      />
      <Button disabled={!input} fullWidth onClick={handleContribute}>
        Contribute
      </Button>
    </div>
  );
};

export default ContributeForm;
