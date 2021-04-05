import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { connect, useSelector } from 'react-redux';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Ketchup', type: 'ketchup' },
    { label: 'Mustard', type: 'mustard' },
    { label: "Chicken", type: 'chicken' }
];

const buildControls = (props) => {
    const totalPrice = useSelector(state => state.totalPrice)
    const ingredients = useSelector(state => state.ingredients)
    const purchasable = useSelector(state => state.purchasable)
    const purchasing= useSelector(state => state.purchasing)
    console.log(controls)
    return(    
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{totalPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>)
};
export default buildControls