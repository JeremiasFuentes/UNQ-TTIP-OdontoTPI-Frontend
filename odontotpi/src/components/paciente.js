import React, { useEffect, useState, onSubmit } from 'react';
import UseQuery from './useSearch';
import profile from '../images/profile-image-default.png';
import fileImage from '../images/file.png';
import '../App.css';
import '../styles/tail.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AccordionCollapse } from 'react-bootstrap';


const Paciente = () => {
    const navigate = useNavigate();

    const [archivo, setArchivo] = useState(null)

    const [legajo, setLegajo] = useState("")
    const [nombre ,  setNombre] = useState("")
    const [apellido ,  setApellido] = useState("")
    const [dni ,  setDni] = useState("")
    const [tel ,  setTel] = useState("")
    const [mail ,  setMail] = useState("")
    const [domicilio ,  setDomicilio] = useState("")
    const [diags, setDiags] = useState([])
    const query = UseQuery();
    const [files, setFiles] = useState([])

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
        setDomicilio(paciente.domicilio)
        setDiags(paciente.diags)

        const data2 = await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/files');
        setFiles(await data2.json())
        console.log(data2)
    }

    const getArchivos = async () => {
        const data2 =  await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/files');
        setFiles(await data2.json())
        console.log(data2)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(text)
        axios.put('http://localhost:8080/paciente/'+ (query.toString().replace('q=', ''))+'/diag',text,{headers: {"Content-Type": "text/plain"}})
        .then((response) => {
            console.log(response)
            setDiags(response.data.diags)
            setText("")
        })

        
    }

    const handleClick = () => {
        navigate("/paciente/odontograma?q="+legajo);
    }

    const handleClickHC = () => {
        navigate("/paciente/historia-clinica?q="+legajo);
    }

    const subirArchivo = (e) =>{
        setArchivo(e[0])
        console.log(e[0])
    }

    const insertarArchivo = () =>{
        const f = new FormData()
        f.append("file", archivo)
        axios.post("http://localhost:8080/paciente/"+ (query.toString().replace('q=', ''))+"/file" , f)
        .then((response) => {
            console.log(response)
            setArchivo(null)
            getArchivos()
        }).catch(e => {console.log(e)})
    }
    
    const descargarArchivo = (nombre) => {
        console.log(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/' + nombre)
        axios.get(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/' + nombre)
        .then((response) => {
            console.log(response)
        }).catch(e => {console.log(e)})
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
            <h1 className="text-dark mt-3">Ficha de Paciente</h1>
            <button className="comment-form-button mb-2" onClick={() =>handleClick()}>
                    Odontograma
            </button>
            <button className="comment-form-button mb-2" onClick={() =>handleClickHC()}>
                    Historia Clinica
            </button>
            <div className="container mt-2 info-paciente">
                <img src={profile} className='profile-pic'/>
                <p><bold className='text-light mt-3'>Nombre: {nombre}</bold></p>
                <p><bold className='text-light'>Apellido: {apellido}</bold></p>
                <p><bold className='text-light'>DNI: {dni}</bold></p>
                <p><bold className='text-light'>Domicilio: {domicilio}</bold></p>
                <p><bold className='text-light'>Telefono: {tel}</bold></p>
                <p><bold className='text-light'>Mail: {mail}</bold></p>
          
                <p><bold className='text-light'>Archivos:</bold></p>
                <div class="input-group">
                <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Subir" onChange={(e) => subirArchivo(e.target.files) }/>
                <button class="btn btn-outline-light" type="button" id="inputGroupFileAddon04" onClick={() => insertarArchivo()}>Subir</button>
                </div>
                <div className='fileList'>
                        
                {files.map((f) => (
                    <div className='mt-2 fileCard '> 
                    <div class="card" style={{width: '10rem' , height: '15rem'}}>
                    <img src={fileImage} alt="..." width="70" height="70" className='fileImage'/>
                    <div class="card-body">
                        <p class="card-title" className='text-dark'>{f.nombre}</p>
                        <a  class="btn btn-primary" href={f.downloadURL}>Descargar</a>
                    </div>
                    </div>
                    </div>
                ))}
                </div>
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