import React from 'react';
import './Emoji.css'
import emojis from '../../cell-emojis.json'
import Circle from '../Animations/shapes/circle/circle';

const Emoji = ({
  id=''
}) => {
  return ( 
    <div>
      {id==='circle' ? <Circle /> :
      <img src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${emojis[id]}/512.gif`} alt="🐉" width="90" height="90" />}
    </div>
  );
}
 
export default Emoji;