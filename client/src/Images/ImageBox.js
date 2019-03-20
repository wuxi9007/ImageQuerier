import React, { Component } from 'react';
import { baseURL } from '../actions/types';

class ImageBox extends Component {
    render() {
        // props from parent: title, path, annotations
        const { title, path, annotations } = this.props;
        const imageBaseURL = baseURL + path;
        return (
            <div className='column is-3'>
                <div className='card'>
                    <div className='card-image' style={styles.imageWrapperStyle}>
                        <img src={imageBaseURL} alt={'default'} style={styles.imageStyle} />
                    </div>
                    <div style={styles.annotationPaddingStyle}>
                        <div style={styles.titleStyle}>{title}</div>
                        <div style={styles.annotationHeightStyle}>
                            {annotations.map(({ id, label, numeric_value, string_value, units }) =>
                                <div className='columns' key={id} style={{ marginBottom: 0 }}>
                                    <div className='column is-4'>{label}</div>
                                    <div className='column is-8'>{numeric_value === null ? string_value:numeric_value} {units}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

const styles = {
    containerStyle: {
        boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
        alignItems: 'center'
    },
    annotationPaddingStyle: {
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 20,
    },
    imageWrapperStyle: {
        textAlign: 'center'
    },
    imageStyle: {
        height: 300
    },
    annotationStyle: {
        marginTop: 0,
        listStyleType: "none"
    },
    annotationLabelStyle: {
        flex: 1
    },
    annotationValueStyle: {
        flex: 3
    },
    titleStyle: {
        fontSize: 22
    },
    annotationHeightStyle: {
        paddingTop: 10,
        height: 100,
        overflowY: 'scroll',
        overflowX: 'hidden'
    }
};

export default ImageBox;
