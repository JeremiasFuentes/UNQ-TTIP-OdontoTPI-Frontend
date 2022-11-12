import '../App.css';
import React, { useEffect, useState, onSubmit } from 'react';
import Normal from './normal';
import Extraccion from './extraccion';
import Faltante from './faltante';
import Conducto from './conducto';
import PiezaDentaria from './piezaDentaria';
import { useNavigate } from 'react-router-dom';
import UseQuery from './useSearch';
import axios from 'axios';

const Odontograma = () => {

  const query = UseQuery();

  const [data, setData] = useState([])

  useEffect(() => {getPaciente()},[]);
    
	
	const getPaciente = async () => {
    

    const response = await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/odontograma')
        const data = await response.json()
        const data2 = data.sort((n1,n2) => n1.numero - n2.numero)
        setData(data2)
		
    }
  
  const onChangePiezaNormal = (id ,lado, color) =>{
    const index = data.findIndex((obj => obj.id == id))
    const newDiente = data[index]
    newDiente[lado] = color
    data[index] = newDiente
  }

  const onChangePieza = (id ,tipo) =>{
    const index = data.findIndex((obj => obj.id == id))
    const newDiente = data[index]
    newDiente['tipo'] = tipo
    data[index] = newDiente
  }

  const handleClick = () => {
       console.log(data)
        try{
            axios.put('http://localhost:8080/paciente/'+ (query.toString().replace('q=', '')) + '/odontograma',data)
            .then((response) => {
              setData(data)
            })
            .catch()
        }
        catch{}
  }
 

    return(
        
        <div className="gridO">

          {data.map(d => (
            <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal}></PiezaDentaria></div>
          ))}
        
        <button className="btn btn-primary btn-lg saveOdont" type="button" onClick={() => handleClick()}>Guardar</button>
        
        </div>
        
        
    )
}
export default Odontograma