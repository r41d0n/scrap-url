//Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//material
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

//Assets
import './index.css';

//Actions
import * as actions from './actions';

//Util
import { isFirstRender } from '../../../lib/utils/frontend';
import { isArray, isDefined, isObject, isFunction, isUrl } from '../../../lib/utils/is';

class Scrap extends Component {
    static propTypes = {
        loadNewIndexs: PropTypes.func.isRequired,
        clearIndex: PropTypes.func.isRequired,
        indexs: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            listarResult: false,
            errorUrl: ''
        };
        this.handelIndexOnChange = this.handelIndexOnChange.bind(this);
        this.handleIndexClick = this.handleIndexClick.bind(this);
        this.handelClearIndexOnClick = this.handelClearIndexOnClick.bind(this);
    };

    handelIndexOnChange(e) {
        this.setState({
            url: e.target.value
        });
    };
    handelClearIndexOnClick() {
        this.props.clearIndex();
    }
    handleIndexClick(e) {
        if (isUrl(this.state.url)) {
            this.props.loadNewIndexs({ url: this.state.url });
            this.setState({
                listarResult: true
            });

            console.log('estas son las props :',this.props)
        } else {
            this.setState({
                listarResult: true,
                errorUrl: 'This url is invalid'
            });
        }
    };
    render() {
        const { indexs, loading, clear, error } = this.props;

        const style = {
            marginRight: '1rem'
        };

        if (loading) {
            return (
                <div className="scrap">
                    <h4>Cargando .....</h4>
                    <TextField
                        errorText={this.state.errorUrl}
                        hintText="Enter Url"
                        className="textField"
                        fullWidth={true}
                        onChange={this.handelIndexOnChange}
                    />
                    <div className="Acciones">
                        <RaisedButton label="Index" className="btn-1" onClick={this.handleIndexClick} primary={true} />
                        <RaisedButton label="Clear" onClick={this.handelClearIndexOnClick} secondary={true} />
                    </div>
                </div>
            );
        } else {
            if (isDefined(indexs) && isObject(indexs) && indexs.hasOwnProperty('cantPages') && indexs.hasOwnProperty('cantWords')) {
                return (
                    <div className="scrap">
                        <TextField
                            errorText={this.state.errorUrl}
                            hintText="Enter Url"
                            className="textField"
                            fullWidth={true}
                            onChange={this.handelIndexOnChange}
                        />
                        <div className="Acciones">
                            <RaisedButton label="Index" className="btn-1" onClick={this.handleIndexClick} primary={true} />
                            <RaisedButton label="Clear" onClick={this.handelClearIndexOnClick} secondary={true} />
                        </div>
                        <h3 className="result">Indexed {indexs.cantPages} new pages and {indexs.cantWords} words.</h3>
                    </div>
                );
            } else if (isDefined(indexs) && isObject(indexs) && indexs.hasOwnProperty('mensage')) {
                return (
                    <div className="scrap">
                        <TextField
                            errorText={this.state.errorUrl}
                            hintText="Enter Url"
                            className="textField"
                            fullWidth={true}
                            onChange={this.handelIndexOnChange}
                        />
                        <div className="Acciones">
                            <RaisedButton label="Index" className="btn-1" onClick={this.handleIndexClick} primary={true} />
                            <RaisedButton label="Clear" onClick={this.handelClearIndexOnClick} secondary={true} />
                        </div>
                         <h3 className="result">{indexs.mensage}.</h3>
                    </div>
                );
            } else if (isDefined(clear) && isObject(clear) && clear.hasOwnProperty('mensage')) {
                console.log('entro en el clear');
                return (
                    <div className="scrap">
                        <TextField
                            errorText={this.state.errorUrl}
                            hintText="Enter Url"
                            className="textField"
                            fullWidth={true}
                            onChange={this.handelIndexOnChange}
                        />
                        <div className="Acciones">
                            <RaisedButton label="Index" className="btn-1" onClick={this.handleIndexClick} primary={true} />
                            <RaisedButton label="Clear" onClick={this.handelClearIndexOnClick} secondary={true} />
                        </div>
                        <h3 className="result">Index cleared.</h3>
                    </div>
                );
            } else {
                return (
                    <div className="scrap">
                        <TextField
                            errorText={this.state.errorUrl}
                            hintText="Enter Url"
                            className="textField"
                            fullWidth={true}
                            onChange={this.handelIndexOnChange}
                        />
                        <div className="Acciones">
                            <RaisedButton label="Index" className="btn-1" onClick={this.handleIndexClick} primary={true} />
                            <RaisedButton label="Clear" onClick={this.handelClearIndexOnClick} secondary={true} />
                        </div>
                    </div>
                );
            }
        }

    }
}

export default connect(state => ({
    indexs: state.scrap.indexs,
    loading: state.scrap.loading,
    clear: state.scrap.clear,
    error: state.scrap.error
}), actions)(Scrap);