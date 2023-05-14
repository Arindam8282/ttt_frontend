import React from 'react';
import './MenuButton.css'
import { useHistory } from 'react-router-dom';

const Menu = ({
  title = 'Menu Name',
  uri = '/'
}) => {
  const history = useHistory();

  const onMenuClick = () => {
   history.push(uri) 
   console.log("button clicked")
  }

  return ( 
    <div className='menu'  onClick={onMenuClick} >
      {title}
    </div> 
  );
}
 
export default Menu;