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
import '../styles/tail.css'

const Odontograma = () => {

  const query = UseQuery();
  
  const navigate = useNavigate();

  const [data, setData] = useState([])
  const [ladoIzquierdo, setLado] = useState(true)
  const [tipo , setTipo] = useState(false)
  const [dataFilter , setDataFilter] = useState([])
  const [esAdulto, setEsAdulto] = useState(false)

  const [odontogramaActualizado, setOdontogramaActualizado] = useState(false)
  const [odontogramaNoActualizado, setOdontogramaNoActualizado] = useState(false)
  useEffect(() => {getPaciente()},[]);
    
	
	const getPaciente = async () => {
    

    const response = await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/odontograma')
        const data = await response.json()
        const data2 = data.sort((n1,n2) => n1.numero - n2.numero)
        setData(data2)
        setDataFilter( data2.filter(d => d.observaciones != '') )
		
    const response2 = await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')))
        const paciente = await response2.json()
        setTipo(paciente.adulto)
        setEsAdulto(paciente.adulto)
        
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
              setOdontogramaActualizado(true)
              setData(data)
            })
            .catch(err => setOdontogramaNoActualizado(true))
        }
        catch{}
  }

  const changeLado = () => {
    setLado(!ladoIzquierdo)
  }

  const changeTipo = (e) =>{
    setTipo(e.target.value == 'adulto')
  }
 

  const handleCruz = () =>{
    setOdontogramaActualizado(false)
    setOdontogramaNoActualizado(false)
  }
 
  const onClickMessage = (id) =>{
    const index = data.findIndex((obj => obj.id == id))
    const newDiente = data[index]
    newDiente['observaciones'] = "-"
    data[index] = newDiente
    setDataFilter(data.filter(d => d.observaciones != ''))
  }

  const setText = (id , text) =>{
    const index = data.findIndex((obj => obj.id == id))
    const newDiente = data[index]
    newDiente['observaciones'] = text
    data[index] = newDiente
    setDataFilter(data.filter(d => d.observaciones != ''))
  }



    return(
      <div>
        <div className='arrowBody'>
            <div className='arrowBack'>
                <a href="#" onClick={() => navigate(-1)}>
                <span class="left"></span>
                </a>
            </div>
            </div>
        {!esAdulto && 
        (<div className='selectOdont'>
        <select id="inputState" class="form-control" onChange={changeTipo.bind(this)}>
          <option selected={tipo} value='adulto'>Odontograma de Adulto</option>
          <option selected={!tipo} value='infante'>Odontograma de Infante</option>
        </select>
        </div>)
        }
        {esAdulto && 
        (<div className='selectOdont'>
          <h5 value='adulto' className='text-dark'>Odontograma de Adulto</h5>
        
        </div>)
        }
        
        {ladoIzquierdo && tipo && (
        <div>
          <div className='margintop'>
          <div className='ladoIzquierdo'>
          <h1 className='text-dark textoIzquierda'>Lado Izquierdo</h1>
          <button class="arrow-button" onClick={changeLado}>Ver lado derecho <span class="arrow"></span></button>
          </div>
          
          </div>
          <div className="gridO">
            {data.filter(d => (d.numero > 10 && d.numero < 19)).reverse().map(d => (
              <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal} onClickMessage={onClickMessage}></PiezaDentaria></div>
            ))}
                      {data.filter(d =>(d.numero > 40 && d.numero < 49)).reverse().map(d => (
              <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal} onClickMessage={onClickMessage}></PiezaDentaria></div>
            ))}

          <button className="btn btn-primary btn-lg saveOdont" type="button" onClick={() => handleClick()}>Guardar</button>
          </div>
          </div>
        )}

        {ladoIzquierdo && !tipo && (
        <div>
          <div className='margintop'>
          <div className='ladoIzquierdo'>
          <h1 className='text-dark textoIzquierda'>Lado Izquierdo</h1>
          <button class="arrow-button" onClick={changeLado}>Ver lado derecho <span class="arrow"></span></button>
          </div>
          
          </div>
          <div className="gridO2">
            {data.filter(d => (d.numero > 50 && d.numero < 56)).reverse().map(d => (
              <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal} onClickMessage={onClickMessage}></PiezaDentaria></div>
            ))}
                      {data.filter(d =>(d.numero > 80 && d.numero < 86)).reverse().map(d => (
              <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal} onClickMessage={onClickMessage}></PiezaDentaria></div>
            ))}
          <button className="btn btn-primary btn-lg saveOdont" type="button" onClick={() => handleClick()}>Guardar</button>
          </div>
          </div>
        )}

        
        {!ladoIzquierdo && tipo &&(
        <div>
        <div className='margintop'>
        <div className='ladoIzquierdo'>
        <button class="arrow-button" onClick={changeLado}>Ver lado izquierdo <span class="arrow"></span></button>
        <h1 className='text-dark textoDerecha'>Lado Derecho</h1>
        </div>
        </div>
        <div className="gridO">
          {data.filter(d => (d.numero > 20 && d.numero < 29)).map(d => (
            <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal } onClickMessage={onClickMessage}></PiezaDentaria></div>
          ))}
                    {data.filter(d =>(d.numero > 30 && d.numero < 39)).map(d => (
            <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal} onClickMessage={onClickMessage}></PiezaDentaria></div>
          ))}
        <button className="btn btn-primary btn-lg saveOdont" type="button" onClick={() => handleClick()}>Guardar</button>
        </div>
        </div>
        )}


      {!ladoIzquierdo && !tipo &&(
        <div>
        <div className='margintop'>
        <div className='ladoIzquierdo'>
        <button class="arrow-button" onClick={changeLado}>Ver lado izquierdo <span class="arrow"></span></button>
        <h1 className='text-dark textoDerecha'>Lado Derecho</h1>
        </div>
        </div>
        <div className="gridO2">
          {data.filter(d => (d.numero > 60 && d.numero < 66)).map(d => (
            <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal} onClickMessage={onClickMessage}></PiezaDentaria></div>
          ))}
                    {data.filter(d =>(d.numero > 70 && d.numero < 76)).map(d => (
            <div><PiezaDentaria pieza={d} onChangePieza={onChangePieza} onChangePiezaNormal={onChangePiezaNormal} onClickMessage={onClickMessage}></PiezaDentaria></div>
          ))}
        <button className="btn btn-primary btn-lg saveOdont" type="button" onClick={() => handleClick()}>Guardar</button>
        </div>
        </div>
        )}

        <div className='alertOdont'>
            {odontogramaActualizado && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Odontograma Actualizado!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => handleCruz()}></button>
            </div>)
            }
            {odontogramaNoActualizado && (
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error! Odontograma no Actualizado</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"  onClick={() => handleCruz()}></button>
            </div>)
            }
        </div>
        <div className='numObs'>
        {dataFilter.map(d => (
            <div className='inlineObs'>
              <h1 className='text-dark'>{d.numero}</h1>
              <textarea className='textareaObs' placeholder='Ingrese Diagnostico o anotacion...'
                    
                    onChange={(e) => setText(d.id , e.target.value)}>{d.observaciones}</textarea>
              </div>
            ))} 
        </div>
      </div>
        
    )
}
export default Odontograma