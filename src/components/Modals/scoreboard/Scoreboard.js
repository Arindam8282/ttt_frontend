import React, { useRef, useState } from 'react';
import Draggable from "react-draggable";

import './Scoreboard.css'

const Scoreboard = ({
  score = { player1 : 0, tied : 0, player2 : 0 },
  player1 = 'player1',
  player2 = 'player2',

}) => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const dx = windowSize.current[0]>600 ? 400 : 0
  const dy = windowSize.current[0]>600 ? -400 : 50

  const [currentPosition, setCurrentPosition] = useState({
    xRate: dx,
    yRate: dy
  });

  const onDrag = (e, data) => {
    setCurrentPosition({ xRate: data.lastX, yRate: data.lastY });
  };

  return ( 
    <div>
      {/* <Draggable
          position={{
            x: currentPosition.xRate,
            y: currentPosition.yRate
          }}
          onDrag={onDrag}
        > */}
          <div style={windowSize.current[0]>600?{position:'fixed',top:0,right:0}:{position:'fixed',bottom:0}} className="Piece">
            <div className="container">
              <div className="row">
                <div className="col col-heading">
                  <h1>{player1}</h1>
                </div>
                <div className="col col-display" id="scoreHome">{score.player1}</div>

              </div>
              <div className="row">
                <div className="col col-heading">
                  <h1>TIED</h1>
                </div>
                <div className="col col-display" id="scoreGuest">{score.tied}</div>

              </div>
              <div className="row">
                <div className="col col-heading">
                  <h1>{player2}</h1>
                </div>
                <div className="col col-display" id="scoreGuest">{score.player2}</div>
              </div>
            </div>
          </div>
      {/* </Draggable> */}
    </div> 
  );
}
 
export default Scoreboard;