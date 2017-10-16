//Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Actions
import * as actions from './actions';

//Util
import { isFirstRender } from '../../../lib/utils/frontend';
import { isArray, isDefined, isObject, isFunction } from '../../../lib/utils/is';

class Scrap extends Component {
    static propTypes = {
        loadNewIndexs: PropTypes.func.isRequired,
        indexs: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            listarResult: false
        };
        this.handelIndexOnChange = this.handelIndexOnChange.bind(this);
        this.handleIndexClick = this.handleIndexClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    };

    handelIndexOnChange(e) {
        this.setState({
            url: e.target.value
        });
    };
    handleIndexClick(e) {
        this.props.loadNewIndexs({ url: this.state.url });
        this.setState({
            listarResult: true
        });
    };
    handleClearClick(e) {
        this.props.loadNewIndexs({ url: this.state.url });
        this.setState({
            listarResult: true
        });
    };
    render() {
        const { indexs, loading, error } = this.props;

        const style = {
            marginRight: '1rem'
        };

        if (loading) {
            return (
                <div>
                    <br />
                    <h4>Cargando .....</h4>
                    <br />
                    <input type="text" onChange={this.handelIndexOnChange} />
                    <br />
                    <br />
                    <button onClick={this.handleIndexClick} style={style}>Index</button>
                    <button onClick={this.handleIndexClick}>Clear</button>
                </div>
            );
        } else {
            if (isDefined(indexs) && isObject(indexs) && indexs.hasOwnProperty('cantPages') && indexs.hasOwnProperty('cantWords')) {
                return (
                    <div>
                        <br />
                        <input type="text" onChange={this.handelIndexOnChange} />
                        <br />
                        <br />
                        <button onClick={this.handleIndexClick} style={style}>Index</button>
                        <button onClick={this.handleIndexClick}>Clear</button>
                        <br />
                        <br />
                        <h6>Indexed {indexs.cantPages} new pages and {indexs.cantWords} words.</h6>
                    </div>
                );
            } else if (isDefined(error) && isObject(error) && error.hasOwnProperty('mensage')) {
                return (
                    <div>
                        <br />
                        <input type="text" onChange={this.handelIndexOnChange} />
                        <br />
                        <br />
                        <button onClick={this.handleIndexClick} style={style}>Index</button>
                        <button onClick={this.handleIndexClick}>Clear</button>
                    </div>
                );
            } else {
                return (
                    <div>
                        <br />
                        <input type="text" onChange={this.handelIndexOnChange} />
                        <br />
                        <br />
                        <button onClick={this.handleIndexClick} style={style}>Index</button>
                        <button onClick={this.handleIndexClick}>Clear</button>
                    </div>
                );
            }
        }

    }
}

export default connect(state => ({
    indexs: state.scrap.indexs,
    loading: state.scrap.loading,
    error: state.scrap.error
}), actions)(Scrap);