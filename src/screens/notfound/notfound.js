import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const RouteNotFound = () => {
  return ( 
    <div>
      <h1>404 route not found</h1>
      <a href='/'>Main Menu</a>
      <Link to='/'>Main Menu</Link>
    </div> 
  );
}
 
export default RouteNotFound;