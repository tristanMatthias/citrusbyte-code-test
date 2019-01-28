// tslint:disable-next-line:no-submodule-imports
import { ResourceState } from '@origami/zen-lib/API';


export interface State {
  Me: User;
  Auth: Auth;
  resources: {
    users: Users;
    [name: string]: any;
  };
}

export interface Loader {
  _loading: {
    get?: boolean;
    post?: boolean;
  };
  _errors: {
    get: string | boolean;
    post: string | boolean;
  };
}

export interface Auth {
  verified: null | boolean;
  loggedIn: boolean;
  token?: string | null;
  loading: {
    verifying: boolean;
    loggingIn: boolean;
  };
  errors: {
    loggingIn: null | string;
    verify: null | string;
  };
}


export interface Users extends ResourceState {
  users: User[];
}

export interface User {
  id: null | string;
  fname: null | string;
  lname: null | string;
  email: null | string;
}