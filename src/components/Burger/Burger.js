import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { useSelector } from 'react-redux'; 

const burger = ( props ) => {
    console.log(props.ingredients)
    const ingredients = useSelector(state => state.ingredients)
    console.log(ingredients)
    let transformedIngredients = Object.keys( ingredients )
        .map( igKey => {
            return [...Array( ingredients[igKey].quantity )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])
    console.log(transformedIngredients)
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

export default burger;