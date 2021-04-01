
export default function appReducer(state={
    ingredients: {
        meat: {
            quantity: 0,
            price: 1.3 
        },
        salad: {
            quantity: 0,
            price: 0.5 
        },
        bacon: {
            quantity: 0,
            price: 0.7 
        },
        cheese: {
            quantity: 0,
            price: 0.4
        },
    },
    purchasable: false,
    totalPrice: 4,

}, action) {
    switch (action.type) {
        case "ADD_INGREDIENT":
            const newState_add = Object.assign({}, state)
            newState_add.ingredients[action.payload].quantity += 1
            newState_add.totalPrice += newState_add.ingredients[action.payload].price
            return newState_add
        case "REMOVE_INGREDIENT":
            const newState_remove = Object.assign({}, state)
            newState_remove.ingredients[action.payload].quantity -= 1
            newState_add.totalPrice -= newState_remove.ingredients[action.payload].quantity.price
            return newState_remove
        default:
            return state
        }
    }
