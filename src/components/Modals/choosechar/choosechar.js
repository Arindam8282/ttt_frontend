import React, { useState } from 'react';
import './choosechar.css'
import emojis from '../../../cell-emojis.json'
import Emoji from '../../Emoji/Emoji';

const Choosechar = ({
  setSelectedChar = () => {},
  excludeChar = ""
}) => {

  const [selectedChar,setChar] = useState("dragon")

  const select = (item)=> {
    setChar(item)
  }
  const next = () => {
    setSelectedChar(selectedChar)
  }
  return ( 
    <div className='c-char-modal'>
      <h1 className='c-char-header'>Choose Your character</h1>
      <div className='e-cover'>
        {
          Object.keys(emojis).filter((item)=> item!==excludeChar).map((item,index)=>
            <div className={`c-pointer ${selectedChar===item ?'selected':''}`} onClick={()=>select(item)} key={index}>
              <Emoji id={item} />
            </div>
          )
        }
      </div>
      <button className='c-char-continue c-pointer' onClick={next} disabled={selectedChar===''}>continue</button>
    </div> 
  );
}
 
export default Choosechar;