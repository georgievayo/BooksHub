import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getUserBooksSuccess(result) {
    return { type: 'GET_USER_BOOKS_SUCCESS', books: result.books, booksCount: result.booksCount };
}

export function getBookDetailsSuccess(book) {
    return { type: 'GET_BOOK_DETAILS_SUCCESS', book };
}

export function getCurrentlyReadingBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/reading?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getWantToReadBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/wishlist?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}

export function getReadBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/read?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}

export function getBookDetails(title) {
    return function (dispatch) {
        return requester.get(`${api.BOOKS}/${title}`)
            .done(response => {
                dispatch(getBookDetailsSuccess(response.book));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}