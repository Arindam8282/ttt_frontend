import React from 'react';
import './Cell.css'
import Circle from '../../Animations/shapes/circle/circle';
import Emoji from '../../Emoji/Emoji';

const Cell = ({
  onClick = ()=>{},
  item = "dragon"
}) => {

  const onCellClick = ()=> {
    onClick()
  }

  return ( 
    <div  className='cell' onClick={onCellClick}>
        {
        item==='' ? '' :  
        item==='circle'?
          <Circle />
        :
          <Emoji id={item} />
        }
    </div>
  );
}
 
export default Cell;