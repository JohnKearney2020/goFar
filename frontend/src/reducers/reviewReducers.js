import { REVIEWS_REQUEST, REVIEWS_SUCCESS, REVIEWS_FAIL,  REVIEWS_RESET } from '../constants/reviewConstants';

export const reviewListReducer = (state = { reviews: [], page: 1, pages: 1, loading: false }, action) => {
  switch(action.type) {
    case REVIEWS_REQUEST:
      return { ...state, loading: true };
    case REVIEWS_SUCCESS:
      return { loading: false, 
        reviews: action.payload.reviews, 
        page: action.payload.page,
        pages: action.payload.pages 
      };
    case REVIEWS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case REVIEWS_RESET:
      return { reviews: [], page: 1, pages: 1, loading: false };
    default: 
      return state;
  } 
}