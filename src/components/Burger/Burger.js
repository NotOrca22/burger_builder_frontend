import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { connect } from 'react-redux'; 

const burger = ( props ) => {
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};
// 
const mapStateToProps = (state) => ({
    ingredients:{
        salad: state.ingredients.salad.quantity,
        meat: state.ingredients.meat.quantity,
        bacon: state.ingredients.bacon.quantity,
        cheese: state.ingredients.cheese.quantity
    }
}
)
export default connect(mapStateToProps)(burger);