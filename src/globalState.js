import Context from './context';
import {useState} from 'react'


function GlobalState(props){

  const [selectedParticipant, setSelectedParticipant]=useState('')
  
  

  return (
    <Context.Provider value={{
      selectedParticipant:selectedParticipant,
      setSelectedParticipant:setSelectedParticipant,
    }}>
        {props.children}
    </Context.Provider>
  )
}
export default GlobalState;