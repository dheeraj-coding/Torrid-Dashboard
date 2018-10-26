import React, { Component } from 'react';
import MyAppBar from './components/AppBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Affected from './components/Affected'
import Register from './components/Register';
import Dashboard from './components/dashboard';
import fireb from './fireb';
import {
  Typography,
  Button,
} from '@material-ui/core';

function Index(props) {
  return (
    <div style={{
      margin: '20vh auto',
      textAlign: 'center',
    }}>
      <Typography variant='display3'
      >Join Us, Save Lives</Typography>
      <br />
      <Button color='primary' onClick={(event) => {
        this.props.history.push('/register');
      }} variant='outlined' size='large'>Register</Button>
    </div>
  );
}

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
            <Route path='/dashboard.html' exact component={Index.bind(this)} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' render={(props) => {
              return this.state.loginState ? (<Dashboard {...props} username={this.state.email}
              />) : (<Redirect to='/login' />);
            }} />
            <Route path='/affected' component={Affected} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
