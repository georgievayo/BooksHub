import requester from '../requesters/requester';
import api from '../requesters/api';

export function getUserCommentsSuccess(comments) {
    return { type: 'GET_COMMENTS_SUCCESS', comments };
}
export function getUserComments(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/comments`)
            .done(response => {
                dispatch(getUserCommentsSuccess(response.comments));
            });
    }
}