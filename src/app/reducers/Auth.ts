import { AnyAction } from 'redux';
// tslint:disable-next-line match-default-export-name
import immutable from 'seamless-immutable';
import {
  AUTH_CLEAR,
  AUTH_LOADING_SET_LOGGINGIN,
  AUTH_LOADING_SET_VERIFYING,
  AUTH_LOGIN,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT,
  AUTH_VERIFIED,
  AUTH_VERIFIED_FAILED
} from '../actions/Auth';
import { LS_EMAIL, LS_JWT } from '../const';
import { Auth as StateAuth } from '../store/state';


const intitialState = immutable.from<StateAuth>({
  verified: null,
  loggedIn: false,
  token: localStorage.getItem(LS_JWT),
  loading: {
    verifying: false,
    loggingIn: false
  },
  errors: {
    loggingIn: null,
    verify: null
  }
});


// tslint:disable-next-line variable-name
export const Auth = (state = intitialState, action: AnyAction) => {
  switch (action.type) {
    case AUTH_LOADING_SET_VERIFYING:
      return state.setIn(['loading', 'verifying'], action.loading);
    case AUTH_LOADING_SET_LOGGINGIN:
      return state.setIn(['loading', 'loggingIn'], action.loading);


    case AUTH_LOGOUT:
    case AUTH_CLEAR:
      localStorage.removeItem(LS_JWT);

      return state.merge({
        verified: true,
        loggedIn: false,
        token: null
      });


    case AUTH_VERIFIED:
    case AUTH_LOGIN:
      const merging: Partial<StateAuth> = {
        loggedIn: true,
        errors: {
          loggingIn: null,
          verify: null
        },
        token: null,
        verified: true
      };

      if (action.token) {
        localStorage.setItem(LS_JWT, `Bearer ${action.token}`);
        merging.token = action.token;
      }
      if (action.email) localStorage.setItem(LS_EMAIL, action.email);

      return state.merge(merging);


    case AUTH_LOGIN_FAILED:
      return state.setIn(['errors', 'loggingIn'], action.message);


    case AUTH_VERIFIED_FAILED:
      let { message } = action;

      if (action.message.includes('Supplied JWT has expired')) {
        message = 'You were logged out due to inactivity';
      }

      const mergingVerifiedFailed = {
        errors: {
          verify: message
        },
        verified: true
      };

      return state.merge(mergingVerifiedFailed);


    default:
      return state;
  }
};
