import React, { useEffect, useState, onSubmit, useRef } from 'react';
import UseQuery from './useSearch';
import profile from '../images/profile-image-default.png';
import fileImage from '../images/file.png';
import '../App.css';
import '../styles/tail.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AccordionCollapse } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import SignatureCanvas from "react-signature-canvas"
import { DatePicker, DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { getElementError } from '@testing-library/react';


const Paciente = () => {
    const navigate = useNavigate();

    const sigCanvas = useRef({})
    const [tratamientoAgregado, settratamientoAgregado] = useState(false)
    const [tratamientoNoAgregado, settratamientoNoAgregado] = useState(false)
    const [archivoAgregado, setArchivoAgregado] = useState(false)
    const [archivoNoAgregado, setArchivoNoAgregado] = useState(false)

    const [archivo, setArchivo] = useState(null)
    const [firma, setFirma] = useState("")
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
    const [tratamientos, setTratamientos] = useState([])

    const [data, setData] = useState({
        fecha: "",
        tratamiento: "",
        firma: ""
    })


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

        const data3 = await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/tratamientos');
        setTratamientos(await data3.json())
        console.log(tratamientos)
    }

    const getArchivos = async () => {
        const data2 =  await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/files');
        setFiles(await data2.json())
        console.log(data2.json)
    }

    const getTratamientos = async () => {
        const data2 =  await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/tratamientos');
        setTratamientos(await data2.json())
        console.log(data2.json)
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
            setArchivo()
            getArchivos()
            setArchivoAgregado(true)
        }).catch(e => {setArchivoNoAgregado(true)})
    }
    
    const descargarArchivo = (nombre) => {
        console.log(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/' + nombre)
        axios.get(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/' + nombre)
        .then((response) => {
            console.log(response)
        }).catch(e => {console.log(e)})
    }

    const clear = () =>{
        sigCanvas.current.clear()
    }
    
    const save = () =>{
        setFirma(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
        const newData = {...data}
        newData['firma'] = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        setData(newData)
        
    }

    const selectdateStart = (e) =>{
        const newData = {...data}
        newData['fecha'] = e.value
        setData(newData)
    }

    const setText = (e) =>{
        const newData = {...data}
        newData['tratamiento'] = e
        setData(newData)
    }

    const handleCruz = () =>{
        setArchivoAgregado(false)
        setArchivoNoAgregado(false)
        settratamientoAgregado(false)
        settratamientoNoAgregado(false)
      }


    const addTratamiento = () =>{
        console.log(data)
        axios.post("http://localhost:8080/paciente/"+ (query.toString().replace('q=', ''))+"/tratamiento" , data)
        .then((response) => {
            console.log(response)
            setData({
                fecha: "",
                tratamiento: "",
                firma: ""
            })
            setFirma("")
            getTratamientos()
            settratamientoAgregado(true)
        }).catch(e => {settratamientoNoAgregado(true)})
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
            <div className="container mt-2 info-paciente mb-3">
                <img src={profile} className='profile-pic mb-4'/>
                <p><bold className='text-light mt-3'>Nombre: {nombre}</bold></p>
                <p><bold className='text-light'>Apellido: {apellido}</bold></p>
                <p><bold className='text-light'>DNI: {dni}</bold></p>
                <p><bold className='text-light'>Domicilio: {domicilio}</bold></p>
                <p><bold className='text-light'>Telefono: {tel}</bold></p>
                <p><bold className='text-light'>Mail: {mail}</bold></p>
          
                <h4 className='text-light'>Archivos:</h4>
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
                <h4 className='text-light mt-3'>Consentimientos:</h4>
                <table className="table table-striped table-hover shadow-lg">
                <thead>
                    <tr className="bg-table text-white">
                        <th class="p-3">Fecha</th>
                        <th class="w-50 p-3">Tratamiento Realizado</th>
                        <th class="p-3">Firma</th>
                        <th class="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {tratamientos.map((t) => (
                        <tr key={t.firma} class="table-light">
                        <td>{t.fecha.substring(0,10)}</td>
                        <td>{t.tratamiento}</td>
                        <td><img src={t.firma} className="firma mt-3"/></td>
                        <td></td>
                        </tr>
                    ))}
                        <tr key='tratamiento' class="table-light">
                            <td><DatePickerComponent onChange={selectdateStart} locale='es' value={data.fecha}/></td>
                            <td><textarea class='text w-75'
                             className="comment-form-textarea"
                             placeholder='Indicar descripcion de tratamiento realizado'
                             value={data.tratamiento}
                             onChange={(e) => setText(e.target.value)}/></td>
                            <td><img src={firma} className="firma mt-3"/></td>
                            <td>
                            <div className="btn-group">
                                <Popup trigger={<button type="button" class="btn btn-light mb-3 mt-3">Firmar</button>} modal nested>
                                    {close =>(
                                        <>
                                        <SignatureCanvas ref={sigCanvas} penColor='black' canvasProps={{className: 'sigCanvas'}} />
                                        <div className="btn-group">
                                            <button type="button" class="btn btn-success" onClick={save}>Guardar</button>
                                            <button type="button" class="btn btn-primary" onClick={clear}>Borrar</button>
                                            <button type="button" class="btn btn-danger" onClick={close}>Cerrar</button>
                                        </div>
                                        </>
                                    )}
                                
                                </Popup>
                                <button type="button" class="btn btn-success mb-3 mt-3" onClick={()=> addTratamiento()} >Agregar</button>
                                </div>
                            </td>
                        </tr>
                </tbody>
            </table>
            
            </div>
            <div className='alertOdont'>
                {archivoAgregado && (
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Archivo Guardado!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => handleCruz()}></button>
                    </div>)
                    }
                {archivoNoAgregado && (
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error al Guardar Archivo</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"  onClick={() => handleCruz()}></button>
                </div>)
                }
                </div>

                <div className='alertOdont'>
                {tratamientoAgregado && (
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Tratamiento Guardado!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => handleCruz()}></button>
                    </div>)
                    }
                {tratamientoNoAgregado && (
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error! Tratamiento no Guardado</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"  onClick={() => handleCruz()}></button>
                </div>)
                }
                </div>
        </div>
    )

}

export default Paciente