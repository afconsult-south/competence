import { postConstants } from '../_constants/post.constants';
import { postService } from '../_services/post.service';
import { alertActions } from '.';
import { history } from '../_helpers';

export const postActions = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        postService.getAll()
            .then(
                posts => dispatch(success(posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

function getById () {
    return dispatch => {
        dispatch(request());

        postService.getAll()
            .then(
                posts => dispatch(success(posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

function create (message) {
    console.log("create(message) - Post.actions");
    return dispatch => {
        dispatch(request(message));

        postService.create(message)
            .then(
                message => { 
                    dispatch(success());
                    dispatch(alertActions.success('Post submit successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(message) { return { type: postConstants.CREATE_REQUEST, message } }
    function success(message) { return { type: postConstants.CREATE_SUCCESS, message } }
    function failure(error) { return { type: postConstants.CREATE_FAILURE, error } }
}

function update () {
    return dispatch => {
        dispatch(request());

        postService.getAll()
            .then(
                posts => dispatch(success(posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        postService.delete(id)
            .then(
                post => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: postConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: postConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: postConstants.DELETE_FAILURE, id, error } }
}