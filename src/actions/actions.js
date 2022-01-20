//action types
// -- string that describes action
// -- eg. todo/todoAdded
export const SET_MOVIES = 'SET_MOVIES';
export const SET_GENRES = 'SET_GENRE';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST';


//actions
export const setMovies = value => {
    return { 
        type: SET_MOVIES, 
        value 
    };
}

export const setGenres = value => {
    return {
        type: SET_GENRES,
        value
    };
}


export const setFilter = value => {
    return { 
        type: SET_FILTER, 
        value 
    };
}


export const setUser = value => {
    return {
        type: SET_USER,
        value
    };
}

export const updateUser = value => {
    return {
        type: UPDATE_USER,
        value
    };
}

export const signoutRequest = value => {
    return {
        type: SIGNOUT_REQUEST,
        value
    }
}


