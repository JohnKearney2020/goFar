import { REVIEWS_REQUEST, REVIEWS_SUCCESS, REVIEWS_FAIL,  REVIEWS_RESET } from '../constants/reviewConstants';
import { ADD_REVIEW_LOADING_TRUE, ADD_REVIEW_LOADING_FALSE, ADD_REVIEW_SHOWMODAL_TRUE, ADD_REVIEW_FAIL, ADD_REVIEW_RESET } from '../constants/reviewConstants';
import { formatDateDayMonthYear } from '../utilityFunctions/formatDayMonthYear';

export const addReviewReducer = (state = { loading: false, showReviewModal: false }, action) => {
  switch(action.type) {
    case ADD_REVIEW_LOADING_TRUE:
      return { ...state, loading: true };
    case ADD_REVIEW_SHOWMODAL_TRUE:
      return { ...state, showReviewModal: true };
    case ADD_REVIEW_LOADING_FALSE: //We can set both of these to false b/c once the review is posted the modal can hide
      return { loading: false, showReviewModal: false };
    case ADD_REVIEW_FAIL:
      return { loading: false, showReviewModal: false, error: formatDateDayMonthYear(action.payload) };
    case ADD_REVIEW_RESET: //This is technically redundant, but I think a separate action type makes it more clear what we are doing
      // ADD_REVIEW_LOADING_FALSE is used when the reviews are done loading. ADD_REVIEW_RESET is used after the product screen unmounts to 
      // reset the state and clear any lingering error messages
      return { loading: false, showReviewModal: false };
    default: 
      return state;
  } 
}

export const reviewListReducer = (state = { 
  reviews: [], page: 1, pages: 1, totalRating: -1, totalReviews: 0, loading: false, loaded: false 
}, action) => {
  switch(action.type) {
    case REVIEWS_REQUEST:
      return { ...state, loading: true, loaded: false };
    case REVIEWS_SUCCESS:
      return { 
        loading: false, 
        reviews: action.payload.reviews, 
        page: action.payload.page,
        pages: action.payload.pages,
        totalRating: action.payload.totalRating,
        totalReviews: action.payload.totalReviews,
        loaded: true
      };
    case REVIEWS_FAIL:
      return { ...state, loading: false, loaded: false, error: action.payload };
    case REVIEWS_RESET:
      return { reviews: [], page: 1, pages: 1, totalRating: -1, totalReviews: 0, loading: false, loaded: false };
    default: 
      return state;
  } 
}
