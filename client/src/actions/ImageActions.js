import { baseURL, IMAGE_FETCH_SUCCESS } from './types';
import axios from 'axios';

export const imageFetch = (callback) => {
    return (dispatch) => {
        console.log('fetching');
        const url = baseURL + 'imageLibrary';
        axios.get(url)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: IMAGE_FETCH_SUCCESS,
                    payload: res.data
                });
                callback();
            });
    }
}
