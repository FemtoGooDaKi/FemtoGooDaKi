import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <div>NAVBAR</div>
        <Switch>
          <Route path="/" exact>
            <div>HOMEPAGE</div>
          </Route>
          
          <Route path="/mycourse" exact>
            <div>Page to show when user login</div>
          </Route>
          
          <Route path="/search" exact>
            <div>Page to show when unauthorised user want to search for course</div>
          </Route>
          
          <Route path="/course/:id">
            <div>Page that explain the course</div>
          </Route>
          
          <Route path="/course/:id/learn">
            <div>Page for the user to learn</div>
          </Route>

          <Route path="/course/:id/test">
            <div>Page to show when the user PreTest or PostTest</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
