//action types
// -- string that describes action
// -- eg. todo/todoAdded
export const SET_MOVIES = 'SET_MOVIES';
export const SET_GENRES = 'SET_GENRE';
export const SET_FILTER = 'SET_FILTER';
export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';


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

export const setUsers = value => {
    return {
        type: SET_USERS,
        value
    };
}

export const setUser = value => {
    return {
        type: SET_USER,
        value
    };
}