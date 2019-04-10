import * as actions from '../utils/constants';

export function loading (state = false, { type }) {
  switch (type) {
    case actions.LOADING:
      return true;
    case actions.DONE_LOADING:
    case actions.ERROR:
      return false;
    default:
      return state;
  }
}

export function error (state = null, { type, payload }) {
  switch (type) {
    case actions.ERROR:
      return payload;
    case actions.LOADING:
      return null;
    default:
      return state;
  }
}