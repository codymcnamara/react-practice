import { useRef, useState } from "react";
import '../css/TwoFactorInput.css'
import { v4 as uuidv4 } from 'uuid';

// https://frontendeval.com/questions/code-input

export default function TwoFactorInput () {
  const currentIndex = useRef(0);
  const inputs = {};
  const [currentCombo, setCurrentCombo] = useState('');
  inputs['input0'] = useRef(null);
  inputs['input1'] = useRef(null);
  inputs['input2'] = useRef(null);
  inputs['input3'] = useRef(null);

  function handleChange(e, ref){
    
    // refactor this, input should always be empty
    
    // if input wasn't empty
    if(e.target.value.length == 2){
      const newChar = e.target.value[1];
      setCurrentCombo(currentCombo + e.target.value);
      if (ref === inputs['input3']){
        return
      }
      inputs[`input${currentIndex.current}`].current.value = e.target.value[0];
      currentIndex.current++;
      inputs[`input${currentIndex.current}`].current.value = newChar;
      if(currentIndex < 3){
        currentIndex.current++;
      }
      inputs[`input${currentIndex.current}`].current.focus();

    // move forward 
    } else if(e.target.value.length > 0){
      setCurrentCombo(currentCombo + e.target.value);
      if (ref === inputs['input3']){
        return
      }
      currentIndex.current++;
      inputs[`input${currentIndex.current}`].current.focus();
    }

    // move backwards 
    if(e.target.value.length === 0){
      setCurrentCombo(currentCombo.slice(0, currentCombo.length - 1));
      if (ref === inputs['input0']){
        return
      }
      currentIndex.current--;
      inputs[`input${currentIndex.current}`].current.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    let finalString = '';
    for (let i = 0; i < 4; i++){
      finalString += inputs['input' + i].current.value;
    }

    if(finalString === '1234'){
      alert('correct code! You\'re verified!')
    }else {
      alert('incorrect code');
    }

    console.log(finalString );
  }

  function handleKeyDown (e, ref) {
    // if you press delete on an empty input go back
    if (e.keyCode === 8 && e.target.value === '') {
      setCurrentCombo(currentCombo.slice(0, currentCombo.length - 1));
      if (ref === inputs['input0']){
        return
      }
      currentIndex.current--;
      inputs[`input${currentIndex.current}`].current.focus();
      inputs[`input${currentIndex.current}`].current.value = '';
    }
  }

  // let inputArray = [];
  // for (let i = 0; i < 4; i++){
  //   inputArray.push(<input 
  //     type="number" 
  //     ref={inputs['input'+ String(i)]} 
  //     max="9"
  //     min="0"
  //     value={currentCombo[i] ? currentCombo[i] : ''}
  //     key={uuidv4()}
  //     onKeyDown={handleKeyDown}
  //     onChange={(e)=>handleChange(e, inputs['input' + String(i)])} />)
  // }

  // if(inputs[`input${currentIndex.current}`].current !== null){
  //   inputs[`input${currentIndex.current}`].current.focus();
  // }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>currentCombo: {currentCombo}</div>
        <div className="inputWrap">
          {/* {inputArray} */}
          <input 
            type="number" 
            ref={inputs['input0']} 
            max="9"
            min="0"
            onKeyDown={handleKeyDown}
            onChange={(e)=>handleChange(e, inputs['input0' ])} />
            <input 
            type="number" 
            ref={inputs['input1']} 
            max="9"
            min="0"
            onKeyDown={handleKeyDown}
            onChange={(e)=>handleChange(e, inputs['input1' ])} />
            <input 
            type="number" 
            ref={inputs['input2']} 
            max="9"
            min="0"
            onKeyDown={handleKeyDown}
            onChange={(e)=>handleChange(e, inputs['input2'])} />
            <input 
            type="number" 
            ref={inputs['input3']} 
            max="9"
            min="0"
            onKeyDown={handleKeyDown}
            onChange={(e)=>handleChange(e, inputs['input3'])} />
        </div>

        <button disabled={currentCombo.length < 4} type="submit">Submit</button>
      </form>
    </>
  )

}