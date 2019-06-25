import API from "../utils/API";

export const GET_TRAFFIC_REQUESTED = 'GET_TRAFFIC_REQUESTED';
export const GET_TRAFFIC_SUCCESS = 'GET_TRAFFIC_SUCCESS';
export const GET_TRAFFIC_FAILURE = 'GET_TRAFFIC_FAILURE';
export function getTraffic()
{
    return dispatch => {
        dispatch({type: GET_TRAFFIC_REQUESTED});
        const request = API.get('/traffic');
        request
            .then(response => dispatch({type: GET_TRAFFIC_SUCCESS, data: response.data.result}))
            .catch(error => dispatch({type: GET_TRAFFIC_FAILURE, data: error}))
        ;
        return request;
    };
}