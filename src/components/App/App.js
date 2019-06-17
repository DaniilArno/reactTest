import React, { Component } from "react"


import Header from './../Header/Header'
import Form from './../Form/Form'
import Info from './../Info/Info'

import './App.css';

export default class App extends Component {

  render() {
    return (
   <div>
		 <Header title="¡Ay caramba!"/>
      <div className="container">
        <Form />
        <Info />
      </div>
   </div>
    )
  }
};

