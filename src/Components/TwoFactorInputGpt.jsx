import React, { useRef } from 'react';

const SecurityCodeInput = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChange = (index, e) => {
    const input = e.target;
    const value = input.value;

    if (!/^\d$/.test(value)) {
      input.value = '';
      return;
    }

    if (value !== '') {
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      }
    } else {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
        inputRefs[index - 1].current.value = '';
      }
    }
  };

  const handleBackspace = (index, e) => {
    if (e.keyCode === 8 && index > 0 && e.target.value === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const code = inputRefs.map((ref) => ref.current.value).join('');

    // Hardcoded 4-digit string for validation
    const hardcodedCode = '1234';

    if (code.length === 4 && code === hardcodedCode) {
      // Call the submitCode function with the concatenated string
      submitCode(code);
    } else {
      // Handle invalid code or incomplete input
      alert('Invalid code or incomplete input');
    }
  };

  const submitCode = (code) => {
    // Perform action with the validated code (e.g., API call)
    console.log('Submitted code:', code);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength="1"
            style={{
              width: '40px',
              height: '40px',
              marginRight: '10px',
              textAlign: 'center',
            }}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleBackspace(index, e)}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SecurityCodeInput;