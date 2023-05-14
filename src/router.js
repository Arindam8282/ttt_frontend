import { BrowserRouter,Switch,Route } from "react-router-dom";
import Game from "./screens/game/game";
import MainMenu from "./screens/mainmenu/MainMenu";
import RouteNotFound from "./screens/notfound/notfound";

const Router = () => {
  return ( 
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainMenu} />
        <Route exact path="/game/:roomid" component={Game} />
        <Route component={RouteNotFound} />
      </Switch>
    </BrowserRouter>
  );
}
 
export default Router;