import { baseURL, IMAGE_FETCH_SUCCESS } from './types';
import axios from 'axios';

export const imageFetch = (callback) => {
    return (dispatch) => {
        console.log('fetching');
        const url = baseURL + 'imageLibrary';
        axios.get(url)
            .then(res => {
                dispatch({
                    type: IMAGE_FETCH_SUCCESS,
                    payload: res.data
                });
                callback();
            });
    }
}

// export const imageFetch = () => {
//     return (dispatch) => {
//         console.log('graphql fetching');
//         fetch(baseURL + 'graphql', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Accept': 'application/json',
//             },
//             body: JSON.stringify({query: "{ hello }"})
//         }).then(r => r.json())
//           .then(data => console.log('data returned:', data));
          
//     }
// }
