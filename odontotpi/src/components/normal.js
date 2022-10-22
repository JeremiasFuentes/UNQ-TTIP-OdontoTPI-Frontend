import '../App.css';
import React, { useEffect, useState, onSubmit } from 'react';
import Extraccion from './extraccion';

const Normal = ({piezaDentaria, onChangeTratamientos}) => {
    const [color1,setColor1] = useState(piezaDentaria.arriba)
    const [color2,setColor2] = useState(piezaDentaria.izquierda)
    const [color3,setColor3] = useState(piezaDentaria.abajo)
    const [color4,setColor4] = useState(piezaDentaria.derecha)
    const [color5,setColor5] = useState(piezaDentaria.centro)

    const [diente,setDiente] = useState("")
    
    useEffect(() => {setDiente(piezaDentaria)},[]);
    
    const handleChange = (fun, color,lado) =>{
            fun(color)
            onChangeTratamientos(lado,color)
    }

    return(
        <div className="odontograma">
        <div class="btn-group dropstart">
            <button type="button" className='trapezoid dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            backgroundColor: color1,}}></button>
            <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor1, 'white', 'arriba')}>Nada</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor1, 'red', 'arriba')}>Restauracion</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor1, 'blue', 'arriba')}>Carie</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor1, 'violet', 'arriba')}>Restauracion Filtrada</button></li>
            </ul> 
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='trapezoid dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            backgroundColor: color2, rotate: '90deg',position:"absolute",top:"-10px",right:"55px"}}></button>
            <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor2, 'white', 'izquierda')}>Nada</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor2, 'red', 'izquierda')}>Restauracion</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor2, 'blue', 'izquierda')}>Carie</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor2, 'violet', 'izquierda')}>Restauracion Filtrada</button></li>
            </ul> 
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='trapezoid dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            backgroundColor: color3, rotate: '0deg',position:"absolute",top:"45px",right:"0px"}}></button>
            <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor3, 'white', 'abajo')}>Nada</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor3, 'red', 'abajo')}>Restauracion</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor3, 'blue', 'abajo')}>Carie</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor3, 'violet', 'abajo')}>Restauracion Filtrada</button></li>
            </ul> 
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='trapezoid dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            backgroundColor: color4, rotate: '-90deg',position:"absolute",top:"-10px",right:"-55px"}}></button>
            <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor4, 'white', 'derecha')}>Nada</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor4, 'red', 'derecha')}>Restauracion</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor4, 'blue', 'derecha')}>Carie</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor4, 'violet', 'derecha')}>Restauracion Filtrada</button></li>
            </ul> 
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='square dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            backgroundColor: color5,position:"absolute",top:"20px",right:"60px"}}></button>
            <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor5, 'white', 'centro')}>Nada</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor5, 'red', 'centro')}>Restauracion</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor5, 'blue', 'centro')}>Carie</button></li>
            <li><button class="dropdown-item" type="button" onClick={() => handleChange(setColor5, 'violet', 'centro')}>Restauracion Filtrada</button></li>
            </ul> 
        </div>
        </div>
        
    )
}
export default Normal

