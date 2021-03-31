const ADD_INGREDIENT = "ADD_INGREDIENT"
const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: ingredient
})

export const removeIngredient = (ingredient) => ({
    type: REMOVE_INGREDIENT,
    payload: ingredient
})