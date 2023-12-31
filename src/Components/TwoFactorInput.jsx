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
    // move forward
    if(e.target.value.length > 0){
      setCurrentCombo(currentCombo + e.target.value);
      if (ref === inputs['input3']){
        return
      }
      currentIndex.current++;
      inputs[`input${currentIndex.current}`].current.focus();
    }
    // don't need code to move backwards, cause when you press delete on empty input the focus moves to previous
    // input from "handleKeyDown" and does the delete there. 
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>currentCombo: {currentCombo}</div>
        <div className="inputWrap">
          {[0,1,2,3].map((num)=>{
            return (
              <input 
                type="number" 
                ref={inputs['input' + String(num)]} 
                max="9"
                min="0"
                key={num}
                // key={uuidv4()} for some reason if i do this the input value gets reset. I think because of re-renders
                onKeyDown={(e) => handleKeyDown(e, inputs['input' + String(num) ])}
                onChange={(e)=>handleChange(e, inputs['input' + String(num) ])} />
            )
          })}
        </div>

        <button disabled={currentCombo.length < 4} type="submit">Submit</button>
      </form>
    </>
  )

}