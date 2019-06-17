import React from 'react'

import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'
import './Info.css';

export default class Info extends React.Component {
	maxId = 100;
  state = {
    data: {}, 
    loading: true, 
    error: null
  }
  componentDidMount() {
    fetch('https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json')
        .then(response => response.json())
        .then(result => this.setState({
          data: result, 
					loading: false,
					error: false
    		}))
				.catch(this.onError)
	}
	onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };
	onDeleted = ( id ) => {
		this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);

      const newArray = [
        ...data.slice(0, idx),
        ...data.slice(idx + 1)
      ];

      return {
        data: newArray
      };
    });
	}
	addItem = () => {
    const newItem = {
      title: 'Довольно не плохо вышло',
			description: '',
			year: '-',
			color: 'red',
			status: '-',
			price: 'Да ?',
      id: this.maxId++
    };

    this.setState( ( {data} ) => {
      const newArr = [
        ...data,
        newItem
      ];
      return {
        data: newArr
      };
    });
  };
  render() {

		const { data, loading, error } = this.state;
		if (error) return  <ErrorIndicator/>;
    if (loading) return <Spinner />;
		if (error) return <div>{`Error: `}</div>;
		
    const buttons = data.map( ( item) =>  {
			const { id } = item;

      return (
          <tr key={ item.id } >
            <td  className="table__title"> { item.title }
              {  item.description ? <p className="table__description">{ item.description }</p> : null }
            </td>
            <td> 
              { item.year }
            </td>
            <td> 
							<div  className='table__color'
										style={{backgroundColor: `${item.color}`}}
										>
							</div>
            </td>
            <td> 
            { item.status }
            </td>
            <td> 
             { item.price }
            </td>
            <td> 
              <button type="button"
											className="btn  btn-sm float-center button_delete"
											onClick={() => this.onDeleted(id) }>
              	Удалить
              </button>
            </td>
          </tr>
      ) 
    });

    return ( 
      <div className='info'>
        <div className="info__title info__title_marginBottom">
          Автомобили в наличии
        </div>
        <table >
          <thead className="table__cell">
            <tr >
              <th>Название</th>
              <th>Год</th>
              <th>Цвет</th>
              <th>Статус</th>
              <th>Цена</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
						{buttons}
          </tbody>
        </table>
				<button type="button"
								className="btn  btn-sm float-center button_add"
								onClick={() => this.addItem() }>
						Добавить
				</button>
      </div>
    )
  }
};
