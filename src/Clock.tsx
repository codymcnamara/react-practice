import {useEffect, useState} from 'react'

export default function Clock() {
    const [dateState, setDateState] = useState<Date>(new Date())

    const hours: number = dateState.getHours();
    const minutes: number = dateState.getMinutes();
    const seconds: number = dateState.getSeconds();

    useEffect(()=>{
        const interval = setInterval( () =>{
            setDateState(new Date())
        }, 500)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <>
            {/* <div className='topBox'></div>
            <div className='bottomBox'></div> */}
            <div>{hours}:{minutes}:{seconds}</div>
        </>
    );

    // could use have two boxes on top of each other and use borders?
    // class could be 
}
