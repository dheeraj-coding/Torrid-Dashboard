import React, { Component } from 'react';
import MyAppBar from './components/AppBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';
import fireb from './fireb';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: window.localStorage.getItem('loggedIn'),
      email: window.localStorage.getItem('UID'),
    }
  }
  componentDidMount() {
    fireb.auth().onAuthStateChanged((user) => {
      if (user) {
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
                />) : (<Redirect to='/login' />);
            }} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
