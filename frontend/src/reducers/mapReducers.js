import { MAP_LOADED_SCRIPT_TRUE, MAP_LOADED_SCRIPT_FALSE } from '../constants/mapConstants';

export const mapReducer = ( state = { loaded: false }, action ) => {
  switch(action.type) {
    case MAP_LOADED_SCRIPT_TRUE:
      return { loaded: true };
    case MAP_LOADED_SCRIPT_FALSE:
      return { loaded: false };
    default: 
      return state;
  } 
}