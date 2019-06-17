import React from 'react'

import './FormItems.css';
import FormErrors from '../FormErrors/FormErrors';
import Arrow from './btnArrow.png'

export default class FormItems extends React.Component {
  constructor() {
    super();
    
    this.state = { 
      name: '', 
      age: '', 
      price: '', 
      descr: '',
      radio: 'white',
			selectedOption: '',
			phone: '',
			email: '',
      formErrors: {name: '', phone: ''},
      emailValid: false,
      phoneValid: false,
      formValid: false
			
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);

  };
  onCheckChange(e) {
    this.setState({
      selectedOption: e.target.value
    })
  };
  onInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
		this.setState({[name]: value},
			() => { this.validateField(name, value);
		});
  };
  onRadioChange(e) {
    this.setState({
      radio: e.target.value
    });
  }
	validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.length >= 7;
        fieldValidationErrors.telephone = phoneValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    phoneValid: phoneValid
                  }, this.validateForm);
	}
	validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.phoneValid});
	}
	errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
		const { name, age, price, descr,  radio,selectedOption, phone, email,phoneValid,emailValid  } = this.state;
		const  isPhoneValid =   (phoneValid) ? '' : 'has-error' ;
		const  isEmailValid =   (emailValid) ? '' : 'has-error' ;
		const inputText = [
      {type: 'text',name: 'name',className: 'form__item form__item_title',
      placeholder: 'Название', value: `${name}`},
      {type: 'text',name: 'age',className: 'form__item form__item_age',
      placeholder: 'Год', value: `${age}`},
      {type: 'text',name: 'price',className: 'form__item form__item_price',
      placeholder: 'Цена', value: `${price}`},
      {type: 'text',name: 'descr',className: 'form__item form__item_descr',
			placeholder: 'Описание', value: `${descr}`},
			{type: 'tel',name: 'phone',className: `form__item form__item_title ${isPhoneValid}`,
			placeholder: 'Телефон', value: `${phone}`},
			{type: 'email',name: 'email',className: `form__item form__item_title ${isEmailValid}`,
      placeholder: 'email', value: `${email}`}
    ];
    const inputItems = inputText.map( ({  type,name, className, placeholder,value}) => {
      return (
       <input key={name} type={type}
              name={name} className={className}
              placeholder={placeholder} value={value} 
              onChange={this.onInputChange} />
      )
    });
    return (
    	<div>
          <FormErrors formErrors={this.state.formErrors} />
        <div className="form__items">
            {inputItems}
        </div>
        <div className="form__items input-group">

        <label className="form__item form__item_radio">  
          <div className="form__item_label">
            Цвет  
          </div>         
          <input type="radio" 
                  value="white" 
                  className="form__item_Whitecolor"
                  checked={ radio === "white"}
                  onChange={this.onRadioChange} />
          <input type="radio" 
                  value="black"
                  className="form__item_Blackcolor"
                  checked={ radio === "black"}
                  onChange={this.onRadioChange}  />
          <input type="radio" 
                  value="gray"
                  className="form__item_color"
                  checked={ radio === "gray"}
                  onChange={this.onRadioChange}  />
          <input type="radio" 
                  value="red" 
                  className="form__item_color"
                  checked={ radio === "red"}
                  onChange={this.onRadioChange} />
          <input type="radio" 
                  value="green"
                  className="form__item_color"
                  checked={ radio === "green"}
                  onChange={this.onRadioChange}  />
				</label>
				<select value={selectedOption} onChange={this.onCheckChange}
								className="form__item form__item_age">
					<option  value="Статус">Статус</option>
					<option value="В наличии">В наличии</option>
					<option value="Ожидается">Ожидается</option>
					<option value="Нет в наличии">Нет в наличии</option>
				</select>
				<button  type="submit" 
									className="btn btn-primary form__item form__item_btn" 
									disabled={!this.state.formValid}>
					ОТПРАВИТЬ
					<img src={Arrow}    alt="Send" className="form__item_img"/>
				</button>
			</div>
    </div>
)
    
  }
};