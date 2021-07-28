export const initialState = {
    basket : [],
    user:null,
    name : "barath",
}

//Selector
export const getBasketTotal = (basket) => 
    basket?.reduce((amount,item)=>item.price + amount,0);

const reducer = (state,action) => {

    switch(action.type){
        case 'ADD_TO_BASKET':
            return{
                ...state,
                basket :[...state.basket,action.item],
            };


        //remove from the basket concept
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex((basketItem)=> basketItem.id === action.id);
            
            let newBasket = [...state.basket];

            if(index >= 0)
            {
                newBasket.splice(index,1);
            }
            else
            {
                console.warn(`can't remove product (id:${action.id}) as its not in basket!`)
            }
            
            return{
                ...state,
                basket : newBasket
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user,
                name : action.name
            }
        case "SET_NAME":
            return {
                ...state,
                name : action.name, 
            }
        default:
            return state;
    }
};

export default reducer;