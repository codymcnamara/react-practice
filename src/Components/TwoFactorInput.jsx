import { useRef } from "react";



export default function TwoFactorInput () {
  const currentIndex = useRef(0);
  const inputs = {};
  inputs['input0'] = useRef(null);
  inputs['input1'] = useRef(null);
  inputs['input2'] = useRef(null);
  inputs['input3'] = useRef(null);

  function handleChange(e, ref){

    // move forward 
    if(e.target.value.length > 0){
      if (ref === inputs['input3']){
        return
      }
      currentIndex.current++;
      inputs[`input${currentIndex.current}`].current.focus();
    }

    // move backwards 
    if(e.target.value.length === 0){
      if (ref === inputs['input0']){
        return
      }
      currentIndex.current--;
      inputs[`input${currentIndex.current}`].current.focus();
    }
  }


  return (
    <>
      <form action="">
        <input type="text" ref={inputs['input0']} onChange={(e)=>handleChange(e, inputs['input0'])} />
        <input type="text" ref={inputs['input1']} onChange={(e)=>handleChange(e, inputs['input1'])} />
        <input type="text" ref={inputs['input2']} onChange={(e)=>handleChange(e, inputs['input2'])} />
        <input type="text" ref={inputs['input3']} onChange={(e)=>handleChange(e, inputs['input3'])} />
        <button>Submit</button>
      </form>
    </>
  )

}