import axios from 'axios';
import domain from '../domain';

// ACTION TYPES
const FETCH_RESULTS = 'FETCH_RESULTS';

// ACTION CREATORS
export const fetchResults = results => ({
  type: FETCH_RESULTS,
  results
});

// THUNK CREATORS
export const fetchResultsThunk = () => dispatch => {
  return axios
    .get(`${domain}/api/results`)
    .then(res => dispatch(fetchResults(res.data)))
    .catch(err => console.error(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_RESULTS:
      return action.results;
    default:
      return state;
  }
}

//There might be a way to configure axios to set a default domain
