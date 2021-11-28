import React from 'react';

const Input = ({ label, name, type, value, min, onChange }) => {
  return (
    <div className='my-5'>
      <label htmlFor={name} className='block font-medium text-gray-600 mb-1'>
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className='border-2 border-gray-200 rounded px-3 py-2 w-full focus:border-green-600 outline-none'
        type={type || 'text'}
        min={min}
      />
    </div>
  );
};

export default Input;
