import React, { Component } from 'react';
import MyAppBar from './components/AppBar';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
class App extends Component {
  render() {
    return (
      <div className="App">
        <MyAppBar />
        <main>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
