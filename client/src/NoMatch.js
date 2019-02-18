import React, { Component } from 'react';

class NoMatch extends Component {
    render() {
        return <div style={styles.containerStyle}>Page Not Found!</div>;
    }
}

const styles = {
    containerStyle: {
        background: '#ecf0f1',
        display: 'flex',
        fontSize: 30,
        justifyContent: 'center',
        padding: 100
    }
};

export default NoMatch;
