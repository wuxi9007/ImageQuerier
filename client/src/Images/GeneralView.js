import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ImageBox from './ImageBox';

const GeneralView = () => {
    return <Query query={gql`
        {
            images {
                id
                path
                title
                annotations {
                    id
                    label
                    string_value
                    numeric_value
                    units
                }
            }
        }
    `}>
        {({ loading, error, data }) => {
            if (loading) return <p><i className="icon-spin4 animate-spin" /></p>;
            if (error) return <p>Server connection failed.</p>;
            if (data.images.length === 0) return <p>No images found.</p>
            return <div className='columns is-multiline'>
                    {data.images.reverse().map(({id, path, title, annotations}) => (
                        <ImageBox key={id} path={path} title={title} annotations={annotations}>
                        </ImageBox>
                    ))}
            </div>;
        }}
    </Query>;
};

export default GeneralView;
