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
import DummyPage from './page/DummyPage/DummyPage'
import Navbar from './components/Navbar/Navbar'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className={'App'}>
        <Switch>
          <Route path="/" exact>
            <Navbar/>
            <HomePage/>
          </Route>

          <Route path="/login" exact>
            <LoginPage/>
          </Route>


          <Route path="/register" exact>
            <RegisterPage/>
          </Route>

          <Route path="/mycourse" exact>
            <Navbar/>
            <CoursePage
                imgUrl = 'https://i.imgur.com/mJM1gO1.jpg'
                name =  "aukmate"
                description = "!312"
                onStartCourse = {(name)=>console.log(name)}
            />
          </Route>

          <Route path="/search" exact>
            {/* <div>Page to show when user want to search for course</div> */}
            <Navbar />
            <SearchResultPage/>
          </Route>

          <Route path="/career" exact>
            <div>Career</div>
          </Route>

          <Route path="/course/:id">
          <Navbar/>
            <CoursePage
                imgUrl = 'https://i.imgur.com/mJM1gO1.jpg'
                name =  "aukmate"
                description = "!312"
                onStartCourse = {(name)=>console.log(name)}
            />
          </Route>

          <Route path="/course/:id/learn">
            <div>Page for the user to learn</div>
          </Route>

          <Route path="/course/:id/test">
            <div>Page to show when the user PreTest or PostTest</div>
          </Route>

          <Route path="/addcourse" exact>
            <div>Add Course</div>
          </Route>

          <Route path="/testing" exact>
            <DummyPage>Page to show when the user PreTest or PostTest</DummyPage>
          </Route>

          <Route path="/navbar" exacy>
            <Navbar/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
