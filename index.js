import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import axios from 'axios';

const reducer = function(state={
    loading: 0,
    payload: []
}, action) {

    switch (action.type) {

        case 'FETCH_USERS_PENDING' : {
            state['loading'] = 1;

            break;
        }

        case 'FETCH_USERS_FULFILLED' : {

            state['loading'] = 0;
            state['payload'] = action.payload.data;

            break;
        }

        case 'FETCH_USERS_REJECTED' : {
            state['loading'] = 0;
            state['payload'] = action.payload;
            break;
        }

    }

    return state;

}

const store = createStore(reducer, applyMiddleware(promise(), thunk, createLogger()));
//
// store.subscribe(() => {
//     //console.log(store.getState());
// })
//
// store.dispatch({
//     type: 'ADD_USER'
// });
//
// store.dispatch({
//     type: 'EDIT_USER'
// });
//

store.dispatch({
    type: 'FETCH_USERS',
    payload: axios.get('https://api.got.show/api/characters')
});


// store.dispatch(dispatch => {
//     dispatch({
//         type: 'FETCH_USERS_START'
//     });
//     axios
//         .get('https://api.got.show/api/characters')
//         .then(response => {
//             dispatch({
//                 type: 'RECEIVE_USERS',
//                 payload: response.data
//             });
//         })
//         .catch(error => {
//             dispatch({
//                 type: 'FETCH_USERS_ERROR',
//                 payload: error
//             })
//         });
// });