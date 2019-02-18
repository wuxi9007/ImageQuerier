import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div style={styles.containerStyle}>
                <div className='buttons' style={styles.rightButtons}>
                    <Link to='/images/search' className='button is-white is-outlined'>Search images</Link>
                    <Link to='#' className='button is-white is-outlined'>Existing set</Link>
                </div>
                <Link to='/' style={styles.icon}><span style={styles.iconFirstHalf}>Image</span><span style={styles.iconSecondHalf}>Sphere</span></Link>
            </div>
        );
    }
}

const styles = {
    icon: {
        marginLeft: '2rem',
        fontSize: '1.7em',
        fontWeight: '600',
        height: '45px',
        paddingTop: '.1rem',
        paddingBottom: '.1rem',
        textTransform: 'uppercase'
    },
    iconFirstHalf: {
        color: '#fff'
    },
    iconSecondHalf: {
        color: 'red'
    },
    rightButtons: {
        float: 'right',
        marginRight: '2rem',
        marginTop: 5
    },
    containerStyle: {
        background: 'linear-gradient(to right, #005AA7, #08c)',
        paddingTop: '1rem',
        paddingBottom: '1rem'
    }
}

export default Header;
