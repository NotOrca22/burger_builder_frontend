import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
// import { dispatch } from 'react-redux'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import { connect} from "react-redux";
import { addIngredient, removeIngredient } from '../store/actions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
    //     const oldCount = this.props.ingredients[type];
    //     if (oldCount < 9) {
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // else {
    //     alert("You can only have up to 9 of each ingredient!")
    // }
        this.props.dispatch(addIngredient(type))
    }

    removeIngredientHandler = ( type ) => {
        // const oldCount = this.state.ingredients[type];
        // if ( oldCount <= 0 ) {
        //     return;
        // }
        // const updatedCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;
        // const priceDeduction = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - priceDeduction;
        // this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        // this.updatePurchaseState(updatedIngredients);
        this.props.dispatch(removeIngredient(type))
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        // alert('You continue!');
        // console.log(toString(this.state.ingredients.cheese))
        // axios.get('/place_order?ingredient=' + this.state.ingredients.bacon.toString() + this.state.ingredients.cheese.toString() + this.state.ingredients.meat.toString() + this.state.ingredients.salad.toString())
        // alert("Thank you! Your order was successful!")
        const queryParams = [];
        for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    
    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        console.log(this.props.ingredients)
        return (
            <Aux>
                <Modal show={this.props.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.props.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.props.totalPrice} />
            </Aux>
        );
    }
}
const mapStateToProps = (state) => ({
    "ingredients": state.ingredients
  })
// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//     }
// }
export default connect(mapStateToProps)(BurgerBuilder)