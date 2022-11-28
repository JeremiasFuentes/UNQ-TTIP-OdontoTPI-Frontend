import '../App.css';
import React, { useEffect, useState, onSubmit } from 'react';
import Normal from './normal';
import Extraccion from './extraccion';
import Faltante from './faltante';
import Conducto from './conducto';
import Protesis from './protesis';
import Corona from './corona';

const PiezaDentaria = ({pieza, onChangePieza, onChangePiezaNormal, onClickMessage}) => {
    const [tratamiento,setTratamiento] = useState(pieza.tipo)
    const [diente,setDiente] = useState("")
    const [diente2,setDiente2] = useState("")

    

    useEffect(() => {
        setDiente(pieza)
    },[]);

    const handleChange = (tipo) =>{
        setTratamiento(tipo)
        onChangePieza(pieza.id,tipo)
        
    }

    const onChangeTratamientos = (lado,color) =>{
        onChangePiezaNormal(pieza.id,lado,color)
    }

    const handleClickMessage = (e) =>{
        onClickMessage(pieza.id)
    }
    
    return(
        <div>
            <div >
                
                { tratamiento == 'normal' && (
                            <Normal piezaDentaria={pieza} onChangeTratamientos={onChangeTratamientos}></Normal>
                        )}
                { tratamiento == 'Extraccion' && (
                            
                            <Extraccion></Extraccion>
                        )}
                { tratamiento == 'Faltante' && (
                    
                    <Faltante></Faltante>
                )}
                { tratamiento == 'Conducto' && (
                    
                    <Conducto></Conducto>
                )}
                { tratamiento == 'Protesis' && (
                    
                    <Protesis></Protesis>
                )}
                { tratamiento == 'Corona' && (
                    
                    <Corona></Corona>
                )}
            </div>
            <div>
            <div className="dropdown drop">
            <h1 className='text-dark'>{pieza.numero}</h1>
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onClick={() => handleChange('normal') }>Normal</a></li>
                    <li><a class="dropdown-item" onClick={() => handleChange('Extraccion')}>Extraccion</a></li>
                    <li><a class="dropdown-item" onClick={() => handleChange('Faltante') }>Faltante</a></li>
                    <li><a class="dropdown-item" onClick={() => handleChange('Conducto') }>Tratamiento de Conducto</a></li>
                    <li><a class="dropdown-item" onClick={() => handleChange('Protesis') }>Protesis</a></li>
                    <li><a class="dropdown-item" onClick={() => handleChange('Corona') }>Corona</a></li>
                </ul>

                <button class="btn btn-secondary" type="button" onClick={handleClickMessage}>
                <i class="fa fa-commenting" aria-hidden="true"></i>
                </button>
            </div>
            </div>
        
        </div>
            
        
    )
}
export default PiezaDentaria