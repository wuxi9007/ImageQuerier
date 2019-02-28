// this component represents each query attribute and associated value in the query form
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { Component } from 'react';
import Select from 'react-select';
import { Range } from 'rc-slider';

class ImageAttributeRow extends Component {
    componentWillMount() {
        const { upperBound, lowerBound } = this.props.propertyValues;
        this.setState({
            selectedOption: null,
            upperBound,
            lowerBound,
            sliderLeft: lowerBound,
            sliderRight: upperBound,
            sliderLeftText: lowerBound,
            sliderRightText: upperBound,
            marks: {
                [lowerBound]: lowerBound,
                [upperBound]: upperBound,
            }
        }, () => {
            if (this.state.upperBound !== null && this.state.upperBound !== undefined) {
                this.updateSliderValues();
            }
        });
        this.updateSlider = this.updateSlider.bind(this);
    }

    updateSelected = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.onProvidingValue(this.props.label, selectedOption.value);
    }
    
    updateSliderValues() {
        this.props.onProvidingValue(this.props.label, [this.state.sliderLeft, this.state.sliderRight]);
    }

    slide = (value) => {
        const { upperBound, lowerBound } = this.props.propertyValues;
        this.setState({
            sliderLeft: value[0],
            sliderLeftText: value[0],
            sliderRight: value[1],
            sliderRightText: value[1],
            marks: {
                [lowerBound]: lowerBound,
                [value[0]]: value[0],
                [value[1]]: value[1],
                [upperBound]: upperBound
            }
        }, () => {
            this.updateSliderValues();
        });
    }

    updateSlider() {
        const { upperBound, lowerBound } = this.props.propertyValues;
        const { sliderLeftText, sliderRightText} = this.state;
        if (lowerBound <= sliderLeftText && sliderLeftText <= sliderRightText && sliderRightText <= upperBound) {
            this.setState({
                sliderLeft: sliderLeftText,
                sliderRight: sliderRightText,
                marks: {
                    [lowerBound]: lowerBound,
                    [sliderLeftText]: sliderLeftText,
                    [sliderRightText]: sliderRightText,
                    [upperBound]: upperBound
                }
            }, () => {
                this.updateSliderValues();
            });
        } else {
            this.setState({
                sliderLeftText: this.state.sliderLeft,
                sliderRightText: this.state.sliderRight
            })
        }
    }    

    onLeftSliderChange = (e) => {
        const newLeft = +e.target.value;
        this.setState({
            sliderLeftText: newLeft
        });
    }

    onRightSliderChange = (e) => {
        const newRight = +e.target.value;
        this.setState({
            sliderRightText: newRight
        });
    }

    renderTextOrNumber() {
        if (this.props.propertyValues.strings === null || this.props.propertyValues.strings === undefined) {
            return (
                <div style={styles.wrapperStyle}>
                    <div className='columns'>
                        <input className='input column is-1' type='text' value={this.state.sliderLeftText} onChange={this.onLeftSliderChange} />
                        <div className='column is-2' style={styles.linkButtonDivStyle}>
                            <div className='button is-white' style={styles.linkStyle} onClick={this.updateSlider}>update left</div>
                        </div>
                        <input className='input column is-offset-7 is-1' type='text' value={this.state.sliderRightText} onChange={this.onRightSliderChange} />
                        <div className='column is-2' style={styles.linkButtonDivStyle}>
                            <div className='button is-white' style={styles.linkStyle} onClick={this.updateSlider}>update right</div>
                        </div>
                    </div>
                    <Range marks={this.state.marks} min={this.state.lowerBound} max={this.state.upperBound} value={[this.state.sliderLeft, this.state.sliderRight]} onChange={this.slide} allowCross={false}/>
                    
                </div>
            );
        } else {
            const { strings } = this.props.propertyValues;
            const options = strings.map((string) => {
                return { value: string, label: string};
            });
            return <Select value={this.state.selectedOption} options={options} onChange={this.updateSelected}/>;
        }
    }
      
    renderUnits() {
        const { units } = this.props.propertyValues;
        if (units === null || units === undefined) return '';
        return ('(' + units + ')');
    }

    render() {
        return (
            <div>
                <hr style={styles.deliminatorStyle}/>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">{this.props.label} {this.renderUnits()}</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                {this.renderTextOrNumber()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    wrapperStyle: {
        width: '100%',
        margin: 10
    },
    linkButtonDivStyle: {
        padding: 0
    },
    linkStyle: {
        color: '#07C'
    },
    deliminatorStyle: {
        borderBottom: '1px solid #EEE'
    }
};

export default ImageAttributeRow;
