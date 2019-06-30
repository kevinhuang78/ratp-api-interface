import { combineReducers } from 'redux';
import traffics from './traffics';
import lines from './lines';
import schedules from './schedules';

export default combineReducers({
    traffics,
    lines,
    schedules
})