import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div style={styles.containerStyle}>
                <span style={styles.university}>XW {new Date().getFullYear()} @ University of Kentucky</span>
            </div>
        );
    }
}

const styles = {
    containerStyle: {
        color: '#000',
        fontSize: 23,
        paddingTop: 100,
        paddingBottom: 100,
        paddingRight: 40,
        display: 'flex',
        justifyContent: 'center'
    },
    university: {
        color: 'rgba(0, 51, 160, 1)'
    }
}

export default Footer;
