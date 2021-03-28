import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Button from '../src/components/UI/Button/Button';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth'

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" />
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
        {/* <Button btnType="Danger" clicked></Button>
        <Button btnType="Success" clicked></Button> */}
      </div>
    );
  }
}

export default App;
