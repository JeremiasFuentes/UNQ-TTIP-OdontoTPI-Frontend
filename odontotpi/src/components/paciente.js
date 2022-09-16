import React, { useEffect, useState, onSubmit } from 'react';
import UseQuery from './useSearch';
import profile from '../images/profile-image-default.png';
import '../App.css';
import axios from 'axios';
const Paciente = () => {
    const [legajo, setLegajo] = useState("")
    const [nombre ,  setNombre] = useState("")
    const [apellido ,  setApellido] = useState("")
    const [dni ,  setDni] = useState("")
    const [tel ,  setTel] = useState("")
    const [mail ,  setMail] = useState("")
    const [diags, setDiags] = useState([])
    const query = UseQuery();

    const [text, setText] = useState("");

    useEffect(() => {getPaciente()},[]);
    
	
	const getPaciente = async () => {
		const data = await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')));
		const paciente = await data.json();
		setLegajo(paciente.legajo);
        setApellido(paciente.apellido);
        setNombre(paciente.nombre);
        setDni(paciente.dni);
        setMail(paciente.mail);
        setTel(paciente.tel);
        setDiags(paciente.diags)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(text)
        axios.put('http://localhost:8080/paciente/'+ (query.toString().replace('q=', ''))+'/diag',text,{headers: {"Content-Type": "text/plain"}})
        .then((response) => {
            console.log(response)
            setDiags(response.data.diags)
        })

        
    }

    return(
        <div>
            <h1 className="text-dark mt-3">Ficha de Paciente</h1>
            <div className="container mt-2 info-paciente">
                <img src={profile} className='profile-pic'/>
                <p><bold className='text-light mt-3'>Nombre: {nombre}</bold></p>
                <p><bold className='text-light'>Apellido: {apellido}</bold></p>
                <p><bold className='text-light'>DNI: {dni}</bold></p>
                <p><bold className='text-light'>Telefono: {tel}</bold></p>
                <p><bold className='text-light'>Mail: {mail}</bold></p>
                <table className="table table-striped table-hover mt-5 shadow-lg">
                    <thead>
                        <tr className="bg-hdiags text-white">
                            <th>Historia Clinica:</th>
                        </tr>
                    </thead>
                    <tbody className='bg-diags'>
                    {diags.map((diag) =>(
                            <tr><p><bold className='text-dark'>{diag}</bold></p></tr>
                            
                        ))}
                    </tbody>
                </table>
                <form onSubmit={handleSubmit}>
                <textarea
                    className="comment-form-textarea"
                    placeholder='Ingrese Diagnostico o anotacion...'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="comment-form-button mb-2">
                    Nuevo Diagnostico
                </button>
                </form>
                
            </div>
            
        </div>
    )

}

export default Paciente