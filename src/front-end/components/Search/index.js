//Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//material
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

//Actions
import * as actions from './actions';

//Assets
import './index.css';

//Util
import { isFirstRender } from '../../../lib/utils/frontend';
import { isArray, isDefined, isObject, isFunction } from '../../../lib/utils/is';

//Components
import DataTable from '../utiles/dataTable';
import ItemPresent from '../utiles/ItemPresent';

class Search extends Component {
    static propTypes = {
        loadPagesOcurrency: PropTypes.func.isRequired,
        pages: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            errorText: '',
            listarPages: false
        };
        this.handelSearchonChange = this.handelSearchonChange.bind(this);
        this.handleSearchonclick = this.handleSearchonclick.bind(this);
    }
    renderPgesList(pages) {
        const datos = pages.datos;
        console.log('El valor de pages ', pages);
        if (isArray(datos)) {
            return (

                <ul>
                    {
                        datos.map((page, key) => {
                            return (
                                <li key={key}>
                                    <Link to={page.url}>{page.title}</Link>-{page.cantida}
                                </li>
                            )
                        })
                    }
                </ul>

            );
        } else {
            return null;
        }
    }

    handelSearchonChange(e) {
        if (e.target.value !== '') {
            this.setState({
                search: e.target.value,
                errorText: ''
            })
        } else {
            this.setState({
                search: e.target.value,
                errorText: 'This field is required'
            })
        }
    }
    handleSearchonclick(e) {
        if (this.state.search !== '') {
            this.props.loadPagesOcurrency({ word: this.state.search });
            this.setState({
                listarPages: true,
                errorText: ''
            });
        } else {
            console.log('no valido');
            this.setState({
               errorText: 'This field is required'
            })
        }
    }

    render() {
        const { pages } = this.props;
        if (!this.state.listarPages) {
            return (
                <div className="Search">
                    <TextField
                        errorText={this.state.errorText}
                        hintText="Enter Word"
                        fullWidth={true}
                        className="textField"
                        onChange={this.handelSearchonChange}
                    />
                    <RaisedButton label="Search" onClick={this.handleSearchonclick} primary={true} />
                </div>
            );
        } else {
            const { cant = 0 } = pages;
            let show = pages.cant > 1 ? `Found ${pages.cant} results` : `Found ${pages.cant} result`
            return (
                <div >
                    <div className="Search">
                        <TextField
                            errorText={this.state.errorText}
                            hintText="Enter Word"
                            fullWidth={true}
                            className="textField"
                            onChange={this.handelSearchonChange}
                        />
                        <RaisedButton label="Search" onClick={this.handleSearchonclick} primary={true} />
                    </div>
                    <h3>{show}</h3>
                    <ItemPresent items={pages.datos} />
                </div>
            );
        }
    }
}


export default connect(state => ({
    pages: state.search.pages
}), actions)(Search);