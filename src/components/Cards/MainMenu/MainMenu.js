import React from 'react';
import './MainMenu.css'

const MainMenuCard = ({
  children
}) => {
  return ( 
  <div className='m-card'>
    {children}
  </div> 
  );
}
 
export default MainMenuCard;