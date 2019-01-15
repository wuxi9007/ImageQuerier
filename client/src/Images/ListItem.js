import React, { Component } from 'react';

class ListItem extends Component {
    render () {
        const { 
            containerStyle,
            imageStyle,
            annotationContainerStyle
        } = styles;
        return (
            <div style={containerStyle}>
                <img src={this.props.image[0]} style={imageStyle} alt={'default'} />
                <div style={annotationContainerStyle}>
                    <div>Title: {this.props.image[2]}</div>
                    <br />
                    <div>Annotations:</div>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            {this.props.image[1].map((prop, index) =>
                                <tr key={index}>
                                    <td style={{  }}>{prop[0]}</td>
                                    <td>{prop[1]}</td>
                                    <td>{prop[2]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const styles = {
    containerStyle: {
        marginLeft: 10,
        boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
        alignItems: 'center'
    },
    imageStyle: {
        width: 400
    },
    annotationStyle: {
        marginTop: 0,
        listStyleType: "none"
    },
    annotationContainerStyle: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
    },
    annotationLabelStyle: {
        flex: 1
    },
    annotationValueStyle: {
        flex: 3
    }
};

export default ListItem;
