import React from 'react'

import './Header.css';
import image from './DUCK.png'

export default class Header extends React.Component {
  render() {
    return ( 
     <div>
        <div className="header">
          <img src={image} 
                alt="logo"
                className="header__image"/>
        </div>
        <div className="header__title">
          {this.props.title}
        </div>
     </div>
    )
  }
};


