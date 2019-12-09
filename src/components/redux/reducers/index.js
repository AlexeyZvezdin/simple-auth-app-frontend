import { SIGN_IN, SIGN_OUT, REGISTERED } from '../actionTypes';

export default function(
  state = {
    signed: false
  },
  action
) {
  switch (action.type) {
    case SIGN_IN: {
      return {
        signed: true
      };
    }
    case SIGN_OUT: {
      return {
        signed: false
      };
    }
    case REGISTERED: {
      return {
        signed: true
      };
    }
    default: {
      return {
        signed: false
      };
    }
  }
}
