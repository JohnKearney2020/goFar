import { USER_ORDER_LIST_REQUEST, USER_ORDER_LIST_SUCCESS, USER_ORDER_LIST_FAIL } from '../constants/orderConstants';

export const userOrderListReducer = (state = { orders: [], page: 1, pages: 1 }, action) => {
  switch(action.type) {
    case USER_ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };
    case USER_ORDER_LIST_SUCCESS:
      return { loading: false, 
        orders: action.payload.orders, 
        page: action.payload.page,
        pages: action.payload.pages 
      };
    case USER_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: 
      return state;
  } 
}