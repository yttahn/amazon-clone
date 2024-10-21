// * useReducer state and action

// ` import action from actionType
import { Type } from "./action.type";

// * * useReducer has two values reducer and initialState

// ` Initialize the state

export const initialState = {
  // # Initially its empty. We use empty array so it'll be easy to count
  basket: [],
  // # for the user, Initially it's null
  user: null,
};
// ` reducer part of the useReducer

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // * check if the item exists
      const existingItem = state.basket.find((item) => {
        return item.id === action.item.id;
      });
      if (!existingItem) {
        return {
          ...state, //` for the initial state
          basket: [...state.basket, { ...action.item, amount: 1 }],
          //` keep the initial(thats's why we use spread operator), the added item.
          //` so for the basket we are giving take the initial state as the first value and add the action.item(added value)
        };
      } else {
        const updateBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return {
          ...state,
          basket: updateBasket,
        };
      }
    // : remover from basket case
    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      return {
        ...state,
        basket: newBasket,
      };
    //: action that add user

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    //: EMPTY_BASKET

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};
