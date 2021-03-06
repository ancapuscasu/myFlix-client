import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { 
    SET_FILTER, 
    SET_MOVIES,
    SET_GENRES,
    SET_USER,
    UPDATE_USER,
    SIGNOUT_REQUEST
} from '../actions/actions';


//reducers
// -- receives current (or initial) state and an action object
// -- decides if update is needed 
// -- returns the new state if action occured, else returns default state
function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default: 
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function genres(state = [], action) {
    switch (action.type) {
        case SET_GENRES:
            return action.value;
        default:
            return state;
    }
}


function user (state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.value;
        case UPDATE_USER:
            return action.value;
        case SIGNOUT_REQUEST:
            return action.value;
        default:
            return state;
    }
}



const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    genres,
    user
});


const rootReducer = (state, action) => {
    if (action.type === SIGNOUT_REQUEST) {;
        storage.removeItem('persist:root')

        return moviesApp(undefined, action)
    }
    return moviesApp(state, action)
};

export default rootReducer;

