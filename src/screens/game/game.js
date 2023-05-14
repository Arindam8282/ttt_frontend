import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'; 
import './game.css'
import emojis from '../../cell-emojis.json'
import Cell from '../../components/Buttons/Cell/Cell';
import Choosechar from '../../components/Modals/choosechar/choosechar';
import CoreUtils from '../../CoreUtils/CoreUtils';
import Scoreboard from '../../components/Modals/scoreboard/Scoreboard';
import { useHistory } from 'react-router-dom';

const Game = () => {
  const { roomid } = useParams()
  const history = useHistory()
  const [gamearr,setGameArr] = useState(["","","","","","","","",""])
  const [yourchar,setYourchar] = useState("")
  const [opponentchar,setopponentchar] = useState("")
  const [gamestatus,setGameStatus] = useState("")
  const [yourTurn,setYourTurn] = useState(false)
  const [wait,setWait] = useState(false)
  const [score,setScore] = useState({
    player1:0,
    tied:0,
    player2:0
  })
  const [socket,setSocket] = useState(io(process.env.REACT_APP_BACKEND))

  useEffect(()=>{
    if(roomid==='singleplayer') {  
      if(!yourTurn) {
        setTimeout(()=>{
          let arr = CoreUtils.tictactoe.botMove(gamearr,yourchar,opponentchar)
          setYourTurn(true)
          setGameArr([...arr])    
          checkGame(arr,yourchar,opponentchar)   
        },1000)        
      }
    }
    else {
     
    }
  },[yourTurn])
  useEffect(()=>{
    if(roomid!=='multiplayer' && roomid!=='singleplayer') {
      // let so = io(process.env.REACT_APP_BACKEND)
      // setSocket(so)
      if(roomid[0]!=="m" || !Object.keys(emojis).includes(roomid.substring(1).replace(/[0-9]/g, '')))
        history.push('/routenotfound')
      socket.on('connect', ()=>{
        console.log("Connected successfully")
      });
      let data = {
        room : roomid,
        username: roomid.substring(1)
      }
      let ych = data.username.replace(/[0-9]/g, '')
      CoreUtils.API({
        uri:'/getnumusers/'+roomid,
        onSuccess:(res)=>{
          console.log('users', res)
          if(res.data.users===undefined) {
            socket.emit('addUser',data)
            setYourchar(ych)  
            setWait(true)
          }
          else{
            setopponentchar(ych)
          }
        },
        onFail: (error)=> {
          console.log('getnumusers fail', error)
          history.push('/routenotfound')
        }
      })

      socket.on('updatechat',(data)=>{
        if(ych!==data.username && data?.useradd===true) {
          setWait(false)
          setopponentchar(data.username.replace(/[0-9]/g, ''))
        }
        else if(data?.message) {
          // setYourTurn(!data.username.replace(/[0-9]/g, '')===yourchar)
          setYourTurn(true)
          inputIncell(data)
        }
        else console.log()
        if(data.over!==undefined) {
          console.log("game over",data.over)
          setGameStatus(data.over)
        }
        if(data.toss!==undefined) setYourTurn(data?.toss)
        if(data.adminTurn!==undefined) setYourTurn(data?.adminTurn)
        console.log("toss",data?.adminTurn)
        // else setYourTurn(false)
        // setYourTurn(false)
        // checkGame(arr,yourchar,opponentchar)
      })
    }
  },[roomid])
  useEffect(()=>{
    if(gamestatus!=="" && roomid!=="singleplayer") { 
      console.log("game over",gamestatus)
      if(gamestatus===yourchar)
        setScore({...score,player1: score.player1+1})
      else if(gamestatus===opponentchar)
        setScore({...score,player2: score.player2+1})
      else
        setScore({...score,tied: score.tied+1})
      restart()
    }
  },[gamestatus])
  // console.log("you",yourchar,"oppo",opponentchar)

  const onContinue = (char)=> {
    if(roomid==='singleplayer') {      
      setYourchar(char)
      setYourTurn(CoreUtils.tictactoe.toss()) 
      let opchar = CoreUtils.tictactoe.getBotChar(char)
      setopponentchar(opchar)
    }
    else if(roomid==='multiplayer'){
      let room = 'm'+char+Date.now()
      let data = {
        room : room,
        username: room.substring(1)
      }


      // history.push('/game/'+room)
      window.location.href = `${window.location.origin}/game/`+room
    }
    else{
      let toss = CoreUtils.tictactoe.toss()
      setYourchar(char)
      setYourTurn(!toss)
      let data = {
        room : roomid,
        adminTurn: toss,
        username: char+roomid.replace(/[a-z]/g, '')
      }

      socket.emit('addUser',data)
    }
  }
  const checkGame = (arr,yourchar,opponentchar) => {
    let over = isOver(arr,yourchar,opponentchar)
    if(over) 
      changeGameStatus(over)
    
    else return 1
  }
  const isOver = (arr,yourchar,opponentchar) => {
    return CoreUtils.tictactoe.isGameOver(arr,yourchar,opponentchar)
  }
  const changeGameStatus = (over)=>{
    setGameStatus(over)
    if(over===yourchar)
      setScore({...score,player1: score.player1+1})
    else if(over===opponentchar)
      setScore({...score,player2: score.player2+1})
    else
      setScore({...score,tied: score.tied+1})
    restart()
  }
  const restart = ()=>{
    setTimeout(()=>{
      setGameArr(["","","","","","","","",""])
      setGameStatus("")
      if(roomid==="singleplayer")
        setYourTurn(CoreUtils.tictactoe.toss()) 
    },3000)
  }
  const inputIncell = (data) => {
    let arr = [...data.gamearr] 
    let index = data.index 
    console.log("message",data,yourchar,opponentchar,data.username===yourchar)

    if(arr[index]==="") {
      arr[index] = data.username
      setGameArr([...arr])
    }
    if(roomid==="singleplayer") {
      checkGame(arr,yourchar,opponentchar)
      setYourTurn(false)
    }
  }
  const onCellClick = (index)=> {
    console.log("gamearr",gamearr)
    let data = {
      index: index,
      gamearr: [...gamearr],
      room: roomid,
      username: yourchar
    }
    if(roomid!=='multiplayer' && roomid!=='singleplayer') {
      let arr = [...gamearr]
      arr[index] = yourchar
      let game = isOver(arr,yourchar,opponentchar)
      console.log("gamestatus",game)
      if(game!=="") {
        setGameStatus(game)
        let toss = CoreUtils.tictactoe.toss()
        setYourTurn(toss)
        data={...data, over: game,toss: !toss}
      }
      else setYourTurn(false)
      inputIncell(data)
      socket.emit('message',data)
    }
    else
      inputIncell(data)
    // if(gamearr[index]==="") {
    //   let arr = [...gamearr]
    //   arr[index] = yourchar
    //   setGameArr([...arr])
    // }
  }

  return (
    <div> 
      {!wait?<div className='game'>
        
        {yourchar!=="" && <div className='g-header'>{roomid!=="singleplayer"?'(You)':''}{yourchar} vs {opponentchar}{roomid==="singleplayer"?'(BOT)':''}</div>}
        <div className={`cover ${!yourTurn?'block':''}`}>
          {
            yourchar===""? <Choosechar excludeChar={opponentchar} setSelectedChar={onContinue} />: 
            <>          
              {gamearr.map((item,index)=>
              <Cell key={index} item={item} onClick={()=>{
                if(yourTurn && gamestatus==="")
                  onCellClick(index)
                }} />)}
            </>
          }      
        </div>
        {yourchar!=="" && <div className='g-status'>
          {gamestatus!=="" ? 
            <>{gamestatus==="tied"?<>match tied restarting</>:<>{gamestatus} has won the match restarting</>}</>:
            !yourTurn ? 'Opponent playing':'Your Turn'}
            <Scoreboard 
              player1={(roomid!=="singleplayer"?'(You)':'')+yourchar}
              player2={opponentchar+(roomid==="singleplayer"?'(BOT)':'')}
              score={score} />
        </div>}
      </div>:<div>
        Waiting for Opponent to join
        Share link with your friend to play with you
        <div className='c-pointer' onClick={()=>{
           navigator.clipboard.writeText(window.location.href);
        }}>copy url</div>
      </div>} 
    </div>
  );
}
 
export default Game;