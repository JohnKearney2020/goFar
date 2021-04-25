import axios from 'axios';
import { CHECKOUT_STEP_CHANGE, CHECKOUT_STEP_RESET } from '../constants/checkoutConstants';

// The get state parameter is needed b/c we will need a JWT from the state for this
export const changeCheckoutStep = (activeKeyValue) => async (dispatch, getState) => {

  // Get the current active key from the global state
  const { checkoutSteps } = getState();
  const { checkoutActiveKey } = checkoutSteps;
  console.log(`checkoutActiveKey from global state: ${checkoutActiveKey}`)
  console.log('typeof checkoutActiveKey: ', typeof checkoutActiveKey)
  // const checkoutActiveKey = useSelector(state => state.checkoutSteps.checkoutActiveKey);
  let newActiveKey = (Number(checkoutActiveKey) + Number(activeKeyValue)).toString();
  try {
    dispatch({
      type: CHECKOUT_STEP_CHANGE,
      payload: newActiveKey
    });
  } catch (error) {
    console.log('there was an error');
    console.log(error);
  }
}