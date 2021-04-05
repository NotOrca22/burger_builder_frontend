import React, { Component} from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import Button from '../src/components/UI/Button/Button';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth'
// import  from './containers/store/reducers'
const mapStateToProps = (state) => ({
  meat: state.ingredients.meat,
  cheese: state["ingredients"]["cheese"],
  salad: state["ingredients"]["salad"],
  bacon: state["ingredients"]["bacon"],
})

class App extends Component {
  render () {
    const ingredients = this.props.ingredients
    return (
      <div>
        <Layout>
          <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" />
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact >
            <BurgerBuilder ingredients={ingredients} logged_in={false} />
          </Route>
          </Switch>
        </Layout>
        {/* <Button btnType="Danger" clicked></Button>
        <Button btnType="Success" clicked></Button> */}
      </div>
    );
  }
}
export default connect(mapStateToProps)(App)
