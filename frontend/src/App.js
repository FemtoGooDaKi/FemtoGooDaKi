import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './page/HomePage/HomePage';
import LoginPage from './page/LoginPage/LoginPage'
import RegisterPage from './page/RegisterPage/RegisterPage'
import CoursePage from './page/CoursePage/CoursePage'
import SearchResultPage from './page/SearchResultPage/SearchResultPage'
import AddCoursePage from './page/AddCoursePage/AddCoursePage'
import LearnPage from './page/LearnPage/LearnPage'
import DummyPage from './page/DummyPage/DummyPage'
import Navbar from './components/Navbar/Navbar'
import MyCoursePage from './page/MyCoursePage/MyCoursePage'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className={'App'}>
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <HomePage />
          </Route>

          <Route path="/login" exact>
            <LoginPage />
          </Route>


          <Route path="/register" exact>
            <RegisterPage />
          </Route>

          <Route path="/mycourse" exact>
            <Navbar />
            <MyCoursePage/>
          </Route>

          <Route path="/search" exact>
            {/* <div>Page to show when user want to search for course</div> */}
            <Navbar />
            <SearchResultPage />
          </Route>

          <Route path="/career" exact>
            <div>Career</div>
          </Route>
          
          <Route path="/course/:id/learn" component={LearnPage}/>
          <Route path="/course/:id" component={CoursePage}/>

          <Route path="/course/:id/test">
            <div>Page to show when the user PreTest or PostTest</div>
          </Route>

          <Route path="/addcourse" exact>
            <Navbar />
            <AddCoursePage />
          </Route>

          <Route path="/testing" exact>
            <DummyPage>Page to show when the user PreTest or PostTest</DummyPage>
          </Route>

          <Route path="/navbar" exact>
            <Navbar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
