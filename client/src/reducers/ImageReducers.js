import { 
    IMAGE_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case IMAGE_FETCH_SUCCESS:
            return { ...state, images: action.payload };
        default:
            return state;
    }
}
