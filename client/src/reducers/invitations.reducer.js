export default function invitations(state = {
    error: {}, hideInviteButton: false
}, action) {
    switch (action.type) {
        case 'SEND_INVITATION_SUCCESS':
            return {
                ...state,
                hideInviteButton: action.hideInviteButton
            };
        default:
            return state;
    }
}