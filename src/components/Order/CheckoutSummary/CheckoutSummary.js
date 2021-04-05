import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
import { useSelector } from 'react-redux';

const checkoutSummary = (props) => {
    const ingredients = useSelector(state => state.ingredients)
    const totalPrice = useSelector(state => state.totalPrice)
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <p>Meat: {ingredients.meat.quantity}</p>
            <p>Cheese: {ingredients.cheese.quantity}</p>
            <p>Bacon: {ingredients.bacon.quantity}</p>
            <p>Salad: {ingredients.salad.quantity}</p>
            <p>Ketchup: {ingredients.ketchup.quantity}</p>
            <p>Mustard: {ingredients.mustard.quantity}</p>
            <p>Chicken: {ingredients.chicken.quantity}</p>
            <p>Price: <strong>{totalPrice.toFixed(2)}</strong></p>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;