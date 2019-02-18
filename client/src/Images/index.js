// import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { imageFetch } from '../actions';
import GeneralView from './GeneralView';

class ImageIndex extends Component {
    componentDidMount() {
        document.title = 'Recent images'
    }

    render() {
        return (
            <div className='page-container'>
                <div className='page-title'>
                    <span className='icon-picture'></span><span>Recently uploaded images</span>
                </div>
                <div style={styles.outerBox}>
                    <GeneralView></GeneralView>
                </div>
            </div>
        );
    }

    // changeImages() {
    //     var images = this.props.images.images;
    //     if (images !== null && images !== undefined) {
    //         let listOfImages = [];
    //         Object.keys(images).forEach(function(key) { // Got images from image server
    //             // images[key]["annotations"]
    //             const url = 'http://localhost:3210/' + images[key]["path"];
    //             const title = images[key]["title"];
    //             const annotations = [];
    //             if (images[key].hasOwnProperty("annotations")) {
    //                 const imageBlock = images[key]["annotations"];
    //                 imageBlock.forEach((annot, ind) => { // Attach each annotation key value to images
    //                     const val = annot.numeric_value === undefined || annot.numeric_value === null ? annot.string_value:annot.numeric_value;
    //                     annotations.push([annot.label, val, annot.units]);
    //                 });
    //             }
    //             const imageDetail = [url, annotations, title];
    //             listOfImages.push(imageDetail);
    //         });
    //         this.setState({ images: listOfImages.map((image, index) => 
    //             <ListItem key={index} image={image} />
    //         ) });
    //     }
    //     // console.log(this);
    // }

    // componentDidMount() {
    //     // Retrieve images from MySQL database
    //     this.props.imageFetch(this.changeImages.bind(this)); // 'this.changeImages.bind()' is a callback
    // }
}

const styles = {
    outerBox: {
        display: 'flex', 
        justifyContent: 'center'
    },
    innerBox: {
        
    }
}

const mapStateToProps = (state) => {
    // const { images } = _.map(state.images, (image) => {
    //     return { ...image }
    // });
    // console.log(images);
    return { images: state.images };
}

export default connect(mapStateToProps, { imageFetch })(ImageIndex);
