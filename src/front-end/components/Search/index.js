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

class Search extends Component {
    static propTypes = {
        loadPagesOcurrency: PropTypes.func.isRequired,
        pages: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            search: '',
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
        this.setState({
            search: e.target.value
        })
    }
    handleSearchonclick(e) {
        this.props.loadPagesOcurrency({ word: this.state.search });
        this.setState({
            listarPages: true
        });
        console.log('El valor de pages en el onclik', this.props.pages);
    }

    render() {
        const { pages } = this.props;
        console.log('Estas son las props', this.props);
        if (!this.state.listarPages) {
            return (
                <div>
                    <br />
                    <input type="text" onChange={this.handelSearchonChange} />
                    <button onClick={this.handleSearchonclick}>Search</button>
                </div>
            );
        } else {
            const { cant = 0 } = pages;
            return (
                <div>
                    <br />
                    <input type="text" onChange={this.handelSearchonChange} />
                    <button onClick={this.handleSearchonclick}>Search</button>
                    <h2>Found {pages.cant} results</h2>

                    {this.renderPgesList(pages)}

                </div>
            );
        }
    }
}


export default connect(state => ({
    pages: state.search.pages
}), actions)(Search);