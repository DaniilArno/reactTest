import React from 'react'

import FormItems from '../FormItems/FormItems'
import './Form.css';

export default class Form extends React.Component {
  constructor() {
    super();

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    console.log('Отправлено');
  };


  render() {

    return ( 
     <div className=" form">
       <form onSubmit={ this.onFormSubmit } >
        <FormItems />
       

      </form>
     </div>
    )
  }
};
