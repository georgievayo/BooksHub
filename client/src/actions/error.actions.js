export function actionFailed(error) {
    return { type: 'ACTION_FAILED', error };
}

export function removeError() {
    return { type: 'REMOVE_ERROR' };
}