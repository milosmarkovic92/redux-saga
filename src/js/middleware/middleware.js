import { ADD_ARTICLES, FOUND_BAD_WORD } from '../constants/constants';

const forbiddenWords = ['spam', 'money', 'pay'];

export function foundBadWordMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            if (action.type === ADD_ARTICLES) {
                const foundWord = forbiddenWords.filter(word =>
                    action.payload.title.includes(word)
                )

                if (foundWord.length) {
                    alert('(' + foundWord + ') is a forbidden word!!!');
                    return dispatch({
                        type: FOUND_BAD_WORD,
                        payload: foundWord
                    })
                }
            }

            return next(action)
        }
    }
}