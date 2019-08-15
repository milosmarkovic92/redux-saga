import { ADD_ARTICLES, FOUND_BAD_WORD, DATA_LOADED } from '../constants/constants';

const initialState = {
    articles: [],
    badWord: [],
    oldPosts: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLES:
            return {
                ...state,
                articles: state.articles.concat(action.payload)
            }
        case FOUND_BAD_WORD:
            return {
                ...state,
                badWord: state.badWord.concat(action.payload)
            }
        case DATA_LOADED:
            return {
                ...state,
                oldPosts: state.oldPosts.concat(action.payload)
            }
        default:
            return state;
    }
}

export default rootReducer;