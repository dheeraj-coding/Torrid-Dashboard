import React, { Component } from 'react';
import MyAppBar from './components/AppBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';
import fireb from './fireb';
import { geolocated } from 'react-geolocated';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: false,
      email: '',
    }
  }
  componentDidMount() {
    fireb.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Auth state changed');
        this.setState({ loginState: true, email: user.email });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <MyAppBar />
        <main>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' render={(props) => {
              return this.state.loginState ? (<Dashboard {...props} username={this.state.email}
                latitude={this.props.coords.latitude} longitude={this.props.coords.longitude} />) : (<Redirect to='/login' />);
            }} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 1,
})(App);
