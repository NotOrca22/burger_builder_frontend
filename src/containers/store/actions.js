const ADD_INGREDIENT = "ADD_INGREDIENT"
const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"
const ALLOW_PURCHASE = "ALLOW_PURCHASE"
const START_PURCHASE = "START_PURCHASE"
const STOP_PURCHASE = "STOP_PURCHASE"

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: ingredient
})

export const removeIngredient = (ingredient) => ({
    type: REMOVE_INGREDIENT,
    payload: ingredient
})

export const allowPurchase = () => ({
    type: ALLOW_PURCHASE
})

export const startPurchasing = () => ({
    type: START_PURCHASE
})

export const stopPurchasing = () => ({
    type: STOP_PURCHASE
})
