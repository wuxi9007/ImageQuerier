import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { imageFetch } from '../actions';
import ListItem from './ListItem';

class ImageIndex extends Component {
    constructor() {
        super();
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        // Retrieve images from MySQL database
        this.props.imageFetch();
    }
    
    render() {
        let listOfImages = [];
        let imagesDisplay = ["No images found."];
        if (this.state.images !== null && this.state.images !== undefined) {
            const images = this.state.images;
            Object.keys(images).forEach(function(key) {
                // images[key]["annotations"]
                const url = 'http://localhost:3210/' + images[key]["path"];
                const title = images[key]["title"];
                const annotations = [];
                if (images[key].hasOwnProperty("annotations")) {
                    const imageBlock = Object.keys(images[key]["annotations"]);
                    imageBlock.forEach(function(annotationKey) {
                        annotations.push([annotationKey, images[key]["annotations"][annotationKey]])
                    });
                }
                const imageDetail = [url, annotations, title];
                listOfImages.push(imageDetail);
            });

            imagesDisplay = listOfImages.map((image, index) => 
                <ListItem key={index} image={image} />
            )
        }
        return (
            <div style={{ padding: 40, justifyContent: 'center' }}>
                <div style={styles.pageTitleStyle}>
                    Image Library
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {imagesDisplay}
                </div>
            </div>
        );
    }
}

const styles = {
    pageTitleStyle: {
        display: 'flex', 
        justifyContent: 'center',
        fontSize: 25
    }
}

const mapStateToProps = (state) => {
    const { images } = _.map(state.images, (image) => {
        return { ...image }
    });
    return { images };
}

export default connect(mapStateToProps, { imageFetch })(ImageIndex);
