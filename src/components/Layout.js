import React from 'react';
import Header from './Header';

const Layout = (props) => (
  <div>
    <Header />
    <div className="container is-fluid">
      {props.children}
    </div>    
  </div>
)

export default Layout;