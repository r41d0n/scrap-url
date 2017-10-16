import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Assets
import './index.css';

class ItemPresent extends Component {
    render() {
        const { items } = this.props;
        if (!items) {
            return null
        } else {
            return (
                <div className="ItemPresent">
                    <ul >
                        {
                            items.map((page, key) => {
                                return (
                                    <li key={key}>
                                        <a href={page.url}>{page.title}</a>
                                        <div>
                                            Ocurences: {page.cantida}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            );
        }
    }
}

export default ItemPresent;