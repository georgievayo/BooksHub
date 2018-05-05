import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';
import * as modalsActions from './modals.actions';

export function getUserBooksSuccess(result) {
    return { type: 'GET_USER_BOOKS_SUCCESS', books: result.books, booksCount: result.booksCount };
}

export function getRecommendedBooksSuccess(books) {
    return { type: 'GET_RECOMMENDED_BOOKS_SUCCESS', books };
}

export function getLatestBooksSuccess(books) {
    return { type: 'GET_LATEST_BOOKS_SUCCESS', books };
}

export function getBookDetailsSuccess(book, canWriteReview, currentUserRating, bookStatus) {
    return { type: 'GET_BOOK_DETAILS_SUCCESS', result: { book, canWriteReview, currentUserRating, bookStatus } };
}

export function rateBookSuccess(result) {
    return { type: 'RATE_BOOK_SUCCESS', result };
}

export function markBookSuccess(result) {
    return { type: 'MARK_BOOK_SUCCESS', result };
}

export function getAllBooksSuccess(result) {
    return { type: 'GET_ALL_BOOKS_SUCCESS', books: result.books, booksCount: result.booksCount };
}

export function addBookSuccess(book) {
    return { type: 'ADD_BOOK_SUCCESS', book };
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

export function getBookDetails(title, userId) {
    return function (dispatch) {
        return requester.get(`${api.BOOKS}/${title}`)
            .done(response => {
                const userCanWriteReview = response.book.reviews.findIndex(review => review.user._id === userId) < 0;
                let currentUserRating = response.book.ratings.find(rating => rating.user === userId);
                if (!currentUserRating) {
                    currentUserRating = { stars: 0 };
                }

                let bookStatus = response.book.statuses.find(status => status.user === userId);
                if (!bookStatus) {
                    bookStatus = { name: 'WantToRead' };
                }

                dispatch(getBookDetailsSuccess(response.book, userCanWriteReview, currentUserRating.stars, bookStatus.name));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function rateBook(userId, bookId, rating) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        const body = {
            user: userId,
            book: bookId,
            stars: rating,
            rated_on: new Date()
        };

        return requester.putAuthorized(token, `${api.BOOKS}/${bookId}/rating`, body)
            .done(response => {
                dispatch(rateBookSuccess({ userRating: body.stars, bookRating: response.bookRating }));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function markBook(bookId, userId, status) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        const body = {
            user: userId,
            book: bookId,
            name: status
        };

        return requester.putAuthorized(token, `${api.BOOKS}/${bookId}/statuses`, body)
            .done(response => {
                dispatch(markBookSuccess({ bookStatus: response.bookStatus }));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getRecommendedBooks() {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        return requester.getAuthorized(token, `${api.RECOMMENDED_BOOKS}`)
            .done(response => {
                dispatch(getRecommendedBooksSuccess(response.books));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getLatestBooks() {
    return function (dispatch) {
        return requester.get(`${api.LATEST_BOOKS}`)
            .done(response => {
                dispatch(getLatestBooksSuccess(response.books));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getAllBooks(page) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        return requester.getAuthorized(token, `${api.BOOKS}?page=${page}`)
            .done(response => {
                dispatch(getAllBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function addBook(book) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.postAuthorized(token, `${api.BOOKS}`, book)
            .done(response => {
                dispatch(addBookSuccess(response.book));
                dispatch(modalsActions.closeAddBookModal());
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
} 

export function editBook(book) {
    
}