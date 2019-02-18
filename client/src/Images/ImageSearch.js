import React, { Component } from 'react';
import LabelButton from '../components/buttons/LabelButton';
import gql from 'graphql-tag';
import ImageAttributeRow from './ImageAttributeRow';
import { client } from '../actions/types';

class ImageSearch extends Component {
    componentWillMount() {
        this.setState({
            allLabels: [],
            labelButtons: {},
            attributesConfirmButton: true,
            attributeForm: 'hidden-field',
            imageResult: 'hidden-field',
            searchAttribute: ''
        });
        this.fetchLabels();
        this.onButtonClick = this.onButtonClick.bind(this);
        this.attributeContinueButtonClicked = this.attributeContinueButtonClicked.bind(this);
        this.searchAttributeName = this.searchAttributeName.bind(this);
    }

    // Fetching all the labels for images before queries
    fetchLabels() {
        client
        .query({
            query: gql`
            {
                labels
            }
        `})
        .then((result) => {
            this.setState({ allLabels: result.data.labels });
        });
    }

    getAllLabels(labels) {
        if (labels === null || labels === undefined) {
            return <p><i className='icon-spin4 animate-spin'>null</i></p>
        } else {
            return labels.map((label) => (
                        <LabelButton key={label} buttonContent={label} onSelect={this.onButtonClick}/>
                ))
        }
    }

    searchAttributeName(e) {
        this.setState({ searchAttribute: e.target.value, allLabels: this.sortLabelsBySearch(e.target.value) });
    }

    // sort function for searching attributes
    sortLabelsBySearch(label) {
        var labels = this.state.allLabels;
        labels.sort((a, b) => {
            return this.matchingScore(b, label) - this.matchingScore(a, label);
        });
        return labels;
    }

    // matching score for sorting function
    matchingScore(str1, str2) {
        const one = str1.toLowerCase();
        const two = str2.toLowerCase();
        var count = 0;
        for (var i = 0; i < two.length; i++) {
            if (i >= one.length) return count;
            if (one.charAt(i) === two.charAt(i)) count++;
        }
        return count;
    }

    onButtonClick(label) {
        var curButtons = this.state.labelButtons;
        if (curButtons.hasOwnProperty(label)) {
            delete curButtons[label];
        } else {
            curButtons[label] = true;
        }
        const curLabelCount = Object.keys(curButtons).length;
        this.setState({ attributesConfirmButton: curLabelCount === 0, labelButtons: curButtons });
        this.setState({ attributeForm: curLabelCount > 0 ? 'displayed':'hidden-field' });
    }

    attributeContinueButtonClicked() {
    }

    render() {
        return (
            <div className='page-container'>
                <div className='attribute-field'>
                    <div className='page-title'>Start by selecting attributes</div>
                    <div className="control has-icons-left has-icons-right attribute-field">
                        <input className="input" type="search" placeholder="Search attribute" value={this.state.searchAttribute} onChange={this.searchAttributeName}/>
                        <span className="icon is-small is-left">
                            <i className="fas icon-search"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                    <div className='buttons'>
                        {this.getAllLabels(this.state.allLabels)}
                    </div>
                </div>
                <div className={this.state.attributeForm} id='attribute-form'>
                    <div className='page-title'>Specify values</div>
                        <div style={{ width: '50%', marginBottom: '10px' }}>
                            {Object.keys(this.state.labelButtons).map((key) => (
                                <ImageAttributeRow key={key} label={key}/>
                            ))}
                        </div>
                    <div className='button is-success' id='result-continue'>Find images</div>
                </div>
                <div className={this.state.imageResult} id='image-result-field'>
                    
                </div>
            </div>
        );
    }
}


export default ImageSearch;
