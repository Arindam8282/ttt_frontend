import React from 'react';
import './MainMenu.css'
import MainMenuCard from '../../components/Cards/MainMenu/MainMenu';
import Menu from '../../components/Buttons/Menu/MenuButton';


const MainMenu = () => {
  return ( 
      <MainMenuCard>
        <h1 className='name-header'>Tic Tac Toe</h1>
        <Menu title='PLAYER VS AI' uri='/game/singleplayer' />
        <Menu title='PLAYER VS PLAYER' uri='/game/multiplayer' />
      </MainMenuCard>
  );
}
 
export default MainMenu;