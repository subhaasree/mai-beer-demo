import { Redirect, Route, Switch } from "react-router-dom";
import UserInputs from "./Container/UserInputs/UserInputs";
import Home from "./Container/Home/home";
export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/UserInput" component={UserInputs} />
      </Switch>
    </div>
  );
};
