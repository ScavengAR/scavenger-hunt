import domain from '../domain';
import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });
export const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER });

/* ------------          REDUCER         ------------------ */

export default function reducer(currentUser = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;

    case REMOVE_CURRENT_USER:
      return {};

    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials, navigation) => dispatch => {
  axios
    .put(`${domain}/auth/login`, credentials)
    .then(res => setUserAndRedirect(res.data, navigation, dispatch))
    .catch(() => navigation.navigate('Login', { error: 'Login failed.' }));
};

export const signup = (credentials, navigation) => dispatch => {
  axios
    .post(`${domain}/auth/signup`, credentials)
    .then(res => setUserAndRedirect(res.data, navigation, dispatch))
    .catch(() => navigation.navigate('Home', { error: 'Signup failed.' }));
};

export const logout = navigation => dispatch => {
  axios
    .delete(`${domain}/auth/logout`)
    .then(() => {
      dispatch(removeCurrentUser());
      navigation.navigate('Home', { error: 'Logout successful.' });
    })
    .catch(error => console.error('Logout successful:  ', error));
};

/* ------------      HELPER FUNCTIONS     ------------------ */

export function setUserAndRedirect(user, navigation, dispatch) {
  dispatch(setCurrentUser(user));
  navigation.navigate('GameOptionPage');
}

/*
To add async storage
Is key enough?

Session id needs to be connected to logged in user.
Key works for the front end but there isn't a user logged in in the backend.

Async storage is not secure so you dont want session.id on it?
Realm?

Why session id instead of user id?
session id is generally public
We don't normally get it normally in react.
User id is stored in a cookie and its automatically sent.
Front end doesnt send cookies. Instead, consider JSON web tokens.
1) Don't use express.session as is, use jSON web tokens instead *** best bet
2) Cookie plugin for react native?
3) Figure out a way for express sessions to work without cookies. Then find a way to send cookie.

*/
