import tictactoe from "./tictactoe";
import axios from 'axios'
const CoreUtils = {
  tictactoe,
  randomNumber: (start,end)=> {
    return Math.floor(Math.random() * (start - end + 1) + end)
  },
  API:({
      uri = '/',
      type = "GET",
      withCredential = false,
      body = null,
      onSuccess = (res)=>{console.log(res)},
      onFail = (error)=>{console.log(error)}
    }) => {
      let auth = withCredential ? {'Authorization': 'Bearer '} : {}
      let data = body? {
        body: JSON.stringify({
          ...body})
      } : ''
      console.log(data)
      axios(process.env.REACT_APP_BACKEND+uri,{
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json',
          ...auth
        },
        method: type,
        ...data
      })
      .then(onSuccess)
      .catch(onFail)
    
  }
}
export default CoreUtils;