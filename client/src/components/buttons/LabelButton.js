import React, { Component } from 'react';

class LabelButton extends Component {
    componentWillMount() {
        this.setState({
            active: false,
            className: "button is-info is-outlined"
        })
    }

    toggleButtonClass = () => {
        const { buttonContent, onSelect } = this.props;
        if (this.state.active) {
            this.setState({ active: false });
            this.setState({ className: "button is-info is-outlined" });
        } else {
            this.setState({ active: true });
            this.setState({ className: "button is-info" });
        }
        onSelect(buttonContent);
    }

    render() {
        return <div className={this.state.className} onClick={this.toggleButtonClass}>{this.props.buttonContent}</div>
    }
}

export default LabelButton;
