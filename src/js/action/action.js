import { ADD_ARTICLES, FOUND_BAD_WORD, DATA_REQUESTED } from '../constants/constants';

export function addArticle(payload) {
    return {
        type: ADD_ARTICLES,
        payload
    }
}

export function badWord(payload) {
    return {
        type: FOUND_BAD_WORD,
        payload
    }
}

// ovo je za asinhrono koriscenje reduxa preko redux-thunk-a

// export function getData() {
//     return function (dispatch) {
//         return fetch("https://jsonplaceholder.typicode.com/posts")
//             .then(response => response.json())
//             .then(json => {
//                 dispatch ({
//                     type: DATA_LOADED,
//                     payload: json
//                 })
//             })
//     }
// }

// ovo je za koriscenje redux-sage

export function getData() {
    return {
        type: DATA_REQUESTED
    }
}