//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//components
import Header from './global/Heder';
import Content from './global/Content';
import Footer from './global/Footer';

//Data
import items from '../data/menu';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Header title="Scraping Pages" items={items} />
        <Content body={children} />
        <Footer copyright="&copy; Ivey 2017" />
      </div>
    );
  }
}

export default App;
