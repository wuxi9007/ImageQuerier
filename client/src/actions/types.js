import ApolloClient from 'apollo-boost';

export const baseURL = 'http://localhost:3210/';
export const graphqlURL = baseURL + 'graphql';
export const client = new ApolloClient({
    uri: graphqlURL
});
export const IMAGE_FETCH_SUCCESS = 'image_fetch_success';
