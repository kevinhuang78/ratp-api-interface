import API from "../utils/API";

export const GET_LINES_REQUESTED = 'GET_LINES_REQUESTED';
export const GET_LINES_SUCCESS = 'GET_LINES_SUCCESS';
export const GET_LINES_FAILURE = 'GET_LINES_FAILURE';
export function getLines()
{
    return dispatch => {
        dispatch({type: GET_LINES_REQUESTED});
        const request = API.get('/lines');
        request
            .then(response => dispatch({type: GET_LINES_SUCCESS, data: response.data.result}))
            .catch(error => dispatch({type: GET_LINES_FAILURE, data: error}))
        ;
        return request;
    };
}