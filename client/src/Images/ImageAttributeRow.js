// this component represents each query attribute and associated value in the query form
import React, { Component } from 'react';

class ImageAttributeRow extends Component {
    render() {
        return <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{this.props.label}</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <p className="control">
                    <input className="input" type="email" placeholder="value" />
                    </p>
                </div>
            </div>
        </div>;
    }
}

export default ImageAttributeRow;
