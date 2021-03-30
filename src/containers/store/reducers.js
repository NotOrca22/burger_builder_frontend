
export default function appReducer(state={
    ingredients: {
        meat: 0,
        salad: 0,
        bacon: 0,
        cheese: 0,
    },
    purchasable: false,
    totalPrice: 4,

}, action) {
    switch (action.type) {
        case "ADD_INGREDIENT":
            const newState_add = Object.assign({}, state)
            newState_add.ingredients[action.payload] += 1
            return newState_add
        case "REMOVE_INGREDIENT":
            const newState_remove = Object.assign({}, state)
            newState_remove.ingredients[action.payload] -= 1
            return newState_remove
        default:
            return state
        }
    }
