
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
        ketchup: {
            quantity: 0,
            price: 0.15
        },
        mustard: {
            quantity: 0,
            price: 0.10
        },
        chicken: {
            quantity: 0,
            price: 3.00
        }
    },
    customer: {
        name: 'Max Schwarzmüller',
        address: {
            street: 'Teststreet 1',
            zipCode: '41351',
            country: 'Germany'
        },
        email: 'test@test.com'
    },
    creditCard: {
        number: '0000 0000 0000 0000',
        expiry: '07/29',
        CVC: '420'
    },
    purchasable: false,
    totalPrice: 4,
    purchasing: false,
    logged_in: false,
    token: "",

}, action) {
    switch (action.type) {
        case "ADD_INGREDIENT":
            const newState_add = Object.assign({}, state)
            newState_add.ingredients[action.payload].quantity += 1
            newState_add.totalPrice += newState_add.ingredients[action.payload].price
            return newState_add
        case "REMOVE_INGREDIENT":
            const newState_remove = Object.assign({}, state)
            if (newState_remove.ingredients[action.payload].quantity > 0) {
            newState_remove.ingredients[action.payload].quantity -= 1
            newState_remove.totalPrice -= newState_remove.ingredients[action.payload].price
            return newState_remove }
            else {
                return state
            }
        case "ALLOW_PURCHASE":
            const newState_allow = Object.assign({}, state)
            newState_allow.purchasable = true
            return newState_allow
        case "START_PURCHASE":
            const newState_purchasing = Object.assign({}, state)
            newState_purchasing.purchasing = true
            return newState_purchasing
        case "STOP_PURCHASE":
        const newState_endpurchasing = Object.assign({}, state)
            newState_endpurchasing.purchasing = false
            return newState_endpurchasing
        case "INIT_INGREDIENTS":
            const newState_init = Object.assign({}, state)
            newState_init.ingredients.bacon.quantity = 0
            newState_init.ingredients.cheese.quantity = 0
            newState_init.ingredients.meat.quantity = 0
            newState_init.ingredients.salad.quantity = 0
            newState_init.ingredients.ketchup.quantity = 0
            newState_init.ingredients.mustard.quantity = 0
            newState_init.ingredients.chicken.quantity = 0
            newState_init.totalPrice = 4
            return newState_init
        case "LOGIN":
            console.log("logging in")
            const newState_login = Object.assign({}, state)
            newState_login.token = action.payload
            newState_login.logged_in = true
            console.log(newState_login.logged_in)
            alert("logged in")
            return newState_login
        default:
            console.log("default")
            console.log(action.type)
            return state
        }
        
    }
