import * as types from "../actions/schedules";

const initialState = {
    schedulesLoading: false,
    schedulesError: null,
    schedulesList: [],
    destinationsLoading: false,
    destinationsError: null,
    destinationsList: [],
    stationsLoading: false,
    stationsError: null,
    stationsList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        // Get schedules
        case types.GET_SCHEDULES_REQUESTED:
            return {
                ...state,
                schedulesLoading: true
            };
        case types.GET_SCHEDULES_SUCCESS:
            return {
                ...state,
                schedulesLoading: false,
                schedulesList: action.data,
                schedulesError: null
            };
        case types.GET_SCHEDULES_FAILURE:
            return {
                ...state,
                schedulesLoading: false,
                schedulesError: action.data
            };
        // Get destinations
        case types.GET_DESTINATIONS_REQUESTED:
            return {
                ...state,
                destinationsLoading: true
            };
        case types.GET_DESTINATIONS_SUCCESS:
            return {
                ...state,
                destinationsLoading: false,
                destinationsList: action.data
            };
        case types.GET_DESTINATIONS_FAILURE:
            return {
                ...state,
                destinationsLoading: false,
                destinationsError: action.data
            };
        // Get stations
        case types.GET_STATIONS_REQUESTED:
            return {
                ...state,
                stationsLoading: true
            };
        case types.GET_STATIONS_SUCCESS:
            return {
                ...state,
                stationsLoading: false,
                stationsList: action.data
            };
        case types.GET_STATIONS_FAILURE:
            return {
                ...state,
                stationsLoading: false,
                stationsError: action.data
            };
        default :
            return state;
    }
}