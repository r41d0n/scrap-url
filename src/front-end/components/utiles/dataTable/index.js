//Dependecies
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

//Assets
import '../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var products = [{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
}];


class Table extends Component {
    constructor(props) {
        super(props);
    }
    construirData(pages) {
        let data = [];
        let datos = pages.datos;

        datos.map((page, key) => {
            // data.push({ id: key, datos: <Link to={page.url}>{page.title}</Link>})
            data.push({ id: key, datos: (<Link to={page.url}>{page.title}</Link>)})
        });
        return data;


    }


    render() {
        const { pages } = this.props;
        const datos = this.construirData(pages);
        console.log('estas son las pages en la tabla', pages);
        return (
            <BootstrapTable data={datos} striped hover>
                <TableHeaderColumn isKey dataField='id'>Resulatdos</TableHeaderColumn>
                <TableHeaderColumn dataField='datos'>Resulatdos</TableHeaderColumn>

            </BootstrapTable>);
    }
};

export default Table;