import API from "../utils/API";

export const GET_SCHEDULES_REQUESTED = 'GET_SCHEDULES_REQUESTED';
export const GET_SCHEDULES_SUCCESS = 'GET_SCHEDULES_SUCCESS';
export const GET_SCHEDULES_FAILURE = 'GET_SCHEDULES_FAILURE';

export function getSchedules(type, code, station, way) {
    return dispatch => {
        dispatch({type: GET_SCHEDULES_REQUESTED});
        const request = API.get('/schedules/' + type + '/' + code + '/' + station + '/' + way);
        request
            .then(response => {
                if (response.data.result.schedules.length === 1) {
                    dispatch({type: GET_SCHEDULES_FAILURE, data: response.data.result.schedules[0]});
                } else {
                    dispatch({type: GET_SCHEDULES_SUCCESS, data: response.data.result.schedules});
                }
            })
        ;
        return request;
    };
}

export const GET_STATIONS_REQUESTED = 'GET_STATIONS_REQUESTED';
export const GET_STATIONS_SUCCESS = 'GET_STATIONS_SUCCESS';
export const GET_STATIONS_FAILURE = 'GET_STATIONS_FAILURE';

export function getStations(type, code) {
    return dispatch => {
        dispatch({type: GET_STATIONS_REQUESTED});
        const request = API.get('/stations/' + type + '/' + code);
        request
            .then(response => dispatch({type: GET_STATIONS_SUCCESS, data: response.data.result.stations}))
            .catch(error => dispatch({type: GET_STATIONS_FAILURE, data: error.response.data.result}))
        ;
        return request;
    };
}

export const GET_DESTINATIONS_REQUESTED = 'GET_DESTINATIONS_REQUESTED';
export const GET_DESTINATIONS_SUCCESS = 'GET_DESTINATIONS_SUCCESS';
export const GET_DESTINATIONS_FAILURE = 'GET_DESTINATIONS_FAILURE';

export function getDestinations(type, code) {
    return dispatch => {
        dispatch({type: GET_DESTINATIONS_REQUESTED});
        const request = API.get('/destinations/' + type + '/' + code);
        request
            .then(response => dispatch({type: GET_DESTINATIONS_SUCCESS, data: response.data.result.destinations}))
            .catch(error => dispatch({type: GET_DESTINATIONS_FAILURE, data: error.response.data.result}))
        ;
        return request;
    };
}