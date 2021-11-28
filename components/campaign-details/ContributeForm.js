import Input from '../common/Input';
import Button from '../common/Button';

const ContributeForm = ({ commonStyle }) => {
  return (
    <div className={`p-8 ml-10 ${commonStyle}`}>
      <h2 className='text-2xl font-semibold'>Contribute to this Campaign</h2>
      <p className={`text-lg font-bold text-indigo-600`}>300 Contributors</p>
      <p className='mt-1 mb-8 text-gray-500'>
        Become a contributor and support the project. You can also make active
        decisions on how the money is being spent.
      </p>
      <Input type='number' label='Minimum Contribution: 0.01 ETH' />
      <Button fullWidth>Contribute</Button>
    </div>
  );
};

export default ContributeForm;
