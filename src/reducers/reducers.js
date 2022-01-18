import { combineReducers } from 'redux';

import { 
    SET_FILTER, 
    SET_MOVIES,
    SET_GENRES,
    SET_USER,
    UPDATE_USER,
    SET_LS_USERNAME
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
        default:
            return state;
    }
}

function ls_username (state = '', action) {
    switch (action.type) {
        case SET_LS_USERNAME:
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    genres,
    user,
    ls_username
});


export default moviesApp;