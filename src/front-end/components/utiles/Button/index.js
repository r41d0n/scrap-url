import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material
import RaisedButton from 'material-ui/RaisedButton';

class Button extends Component {
    static propTypes = {
        loadPagesOcurrency: PropTypes.func.isRequired
    };
    render() {
        return (
            <RaisedButton label="Primary" onClick={this.props.loadPagesOcurrency()} primary={true} />
        );
    }
}

export default Button;