import { combineReducers} from 'redux';
import { remindersReducer } from './remindersReducer';

const reducers = {
    days: remindersReducer
};

export default combineReducers(reducers);