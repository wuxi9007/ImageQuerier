import { combineReducers } from 'redux';
import imageReducers from './ImageReducers';

export default combineReducers({
    images: imageReducers
});