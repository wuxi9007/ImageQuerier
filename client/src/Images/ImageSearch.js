import React, { Component } from 'react';
import LabelButton from '../components/buttons/LabelButton';
import gql from 'graphql-tag';
import ImageAttributeRow from './ImageAttributeRow';
import { client } from '../actions/types';
import ImageBox from './ImageBox';

class ImageSearch extends Component {
    componentWillMount() {
        this.setState({
            allLabels: [],
            labelButtons: {},
            labelValues: [],
            attributesConfirmButton: true,
            labelButtonContinue: true,
            attributeForm: 'hidden-field',
            imageResultField: 'hidden-field',
            searchAttribute: '',
            resultImages: []
        });
        // Fetch current annotation terms for all images in database
        this.fetchLabels();
        // Generate the attribute and value form for users to specify properties of images
        this.onButtonClick = this.onButtonClick.bind(this);
        // Search a label in allLabels and reorder it to the upper left most if found
        this.searchAttributeName = this.searchAttributeName.bind(this);
        // Get values for each property for stricter value input to guarantee image retrieval
        this.getPropertyValues = this.getPropertyValues.bind(this);
        // Update state of key value pairs in the attribute form when user types in value for a property
        this.provideValue = this.provideValue.bind(this);
        // Query images based on user's customized set of properties
        this.fetchImages = this.fetchImages.bind(this);
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
        if (labels === null || labels === undefined || labels.length === 0) {
            return <p><i className='icon-spin4 animate-spin'/></p>
        } else {
            return labels.map((label) => (
                <LabelButton key={label} buttonContent={label} onSelect={this.onButtonClick}/>
            ))
        }
    }

    searchAttributeName(e) {
        this.setState({ searchAttribute: e.target.value, allLabels: this.sortLabelsBySearch(e.target.value) });
    }

    getPropertyValues() {
        const listOfLabels = Object.keys(this.state.labelButtons);
        client
        .query({
            query: gql`
            query labelValues($labels: [String!]) {
                labelValues(labels: $labels)
            }
            `, variables: { labels: listOfLabels}})
            .then(res => {
                const labelValues = res.data.labelValues.map(labelValue => JSON.parse(labelValue));
                
                this.setState({ labelValues, attributeForm: 'displayed' });
            }).catch((e) => console.log(e));
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
            curButtons[label] = '';
        }
        const curLabelCount = Object.keys(curButtons).length;
        this.setState({ labelButtonContinue: curLabelCount === 0, labelButtons: curButtons });
    }

    provideValue(key, value) {
        var curButtons = this.state.labelButtons;
        curButtons[key] = {
            label: key,
            value: value
        };
        this.setState({ labelButtons: curButtons });
        // console.log(this.state.labelButtons);
    }

    fetchImages() {
        client
        .query({
            query: gql`
            query queryImages($queryProperties: [String!]) {
                queryImages(queryProperties: $queryProperties) {
                    id
                    path
                    title
                    annotations {
                        id
                        label
                        numeric_value
                        string_value
                        units
                    }
                }
            }
        `, variables: { queryProperties: Object.values(this.state.labelButtons).map(value => {
                return JSON.stringify(value);
            })
        }})
        .then((results) => {
            this.setState({
                imageResultField: 'displayed',
                resultImages: results.data.queryImages
            });
        });
    }

    renderResultImages() {
        if (this.state.resultImages.length === 0) {
            return <p>No images found.</p>
        } else {
            return (
                <div className='columns is-multiline'>
                    {this.state.resultImages.map(({ id, path, title, annotations }) => {
                        return <ImageBox key={id} path={path} title={title} annotations={annotations}/>
                    })}
                </div>
            );
        }
    }

    render() {
        return (
            <div className='page-container'>
                <div className='attribute-field main-div'>
                    <div className='section-title'>Start by selecting attributes</div>
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
                    <div className='button is-success' id='label-continue' onClick={this.getPropertyValues} disabled={this.state.labelButtonContinue}>Continue</div>
                </div>

                <div className={this.state.attributeForm + ' main-div'} id='attribute-form'>
                    <div className='section-title'>Specify values</div>
                        <div style={{ width: '50%', marginBottom: '10px' }}>
                            {this.state.labelValues.map((labelValue) => (
                                <ImageAttributeRow key={labelValue.label} label={labelValue.label} onProvidingValue={this.provideValue} propertyValues={labelValue}/>
                            ))}
                        </div>
                    <div className='button is-success' id='result-continue' onClick={this.fetchImages}>Find images</div>
                </div>

                <div className={this.state.imageResultField + ' main-div'} id='image-result-field'>
                    <div className='section-title'>Image results</div>
                    {this.renderResultImages()}
                </div>
            </div>
        );
    }
}


export default ImageSearch;
