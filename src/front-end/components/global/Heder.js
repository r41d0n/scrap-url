//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Assets
import logo from './imagenes/logo.svg';
import './css/Header.css';

class Header extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired
    }
    render() {
        const { title, items } = this.props;
        return (
            <div className="Header">
                    <ul className="Menu">    
                        <li><Link to={items[0].url}>{items[0].title}</Link></li>                             
                        <li>|</li>                             
                        <li><Link to={items[1].url}>{items[1].title}</Link></li>                             
                    </ul>
            </div>
        );
        // return (
        //     <div className="Header">
        //         <div className="Logo">
        //             <ul className="Menu">                        {
        //                     items && items.map(
        //                         (item, key) => <li key={key}><Link to={item.url}>{item.title}</Link></li>
        //                     )
        //                 }
        //             </ul>
        //         </div>
        //     </div>
        // );
    }
}

export default Header;
