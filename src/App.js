import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import LoginContainer from './components/Login/LoginContainer';
import { connect } from 'react-redux';
import HomeContainer from './components/Home/HomeContainer'
import './App.css'

const App = (props) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="content-wrapper">
        <Switch>
          <Route path={'/home'}
            render={() =>
              <HomeContainer />}
          />
          <Route exact path={['/login', '/']}
            render={() =>
              props.isAuth ?
                (<Redirect to={'/home'} />)
                :
                (<LoginContainer />)}
          />
        </Switch>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isLoggedIn
})
export default connect(mapStateToProps, null)(App);
