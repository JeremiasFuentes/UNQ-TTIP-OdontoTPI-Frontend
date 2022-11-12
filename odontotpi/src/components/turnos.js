import '../App.css';
import { ScheduleComponent, Inject, Agenda, Day, Month, Week, WorkWeek, EventSettingsModel, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data';
import { useState ,useEffect} from 'react';
import sIcon from '../images/search_icon.png';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import axios from 'axios';

const Turnos = () => {

    const [turnos , setTurnos] = useState([])
    const [pacientes, setPacientes] = useState([])
    const [search ,  setSearch] = useState("")
    const [paciente, setPaciente] = useState()
    const [data , setData] = useState({
        subject : "",
        startTime : "",
        endTime : "",
        description : ""
    })

    const searcher = (e) => {
        setSearch(e.textField)
        setPaciente(e)   
        const newData = {...data}
        newData['subject'] = e.nombre + ' ' + e.apellido
        setData(newData)
    }

    const results = !search ? pacientes : pacientes.filter((dato)=> dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()) || dato.apellido.toLowerCase().includes(search.toLocaleLowerCase()))


    useEffect(() =>{
        showData()
    }, [])

    const showData = async () =>{
        const response = await fetch('http://localhost:8080/paciente/turnos')
        const data = await response.json()
        setTurnos(data)
        const response2 = await fetch('http://localhost:8080/paciente')
        const data2 = await response2.json()
        setPacientes(data2)

    }

    const selectdateStart = (e) =>{
        const newData = {...data}
        newData['startTime'] = e.value
        setData(newData)
    }

    const selectdateEnd = (e) =>{
        const newData = {...data}
        newData['endTime'] = e.value
        setData(newData)
    }

    const setText = (e) =>{
        const newData = {...data}
        newData['description'] = e
        setData(newData)
        console.log(newData)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        try{
            console.log('http://localhost:8080/paciente/' + paciente.legajo + '/turno/save')
            console.log(data)
            axios.post('http://localhost:8080/paciente/' + paciente.legajo + '/turno/save',data)
            .then((response) => {
                setData({
                    subject : "",
                    startTime : "",
                    endTime : "",
                    description : ""
                })
                showData()
            })
            .catch()
        }
        catch{}

        
    }


    return(
        <div>
            <button type="button" class="btn btn-primary mt-3 mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Nuevo Turno
        </button>
        <ScheduleComponent currentView='WorkWeek' eventSettings={{ dataSource: turnos} }>
            <ViewsDirective>
                <ViewDirective option='Day'></ViewDirective>    
                <ViewDirective option='WorkWeek'></ViewDirective>  
                <ViewDirective option='Month'></ViewDirective>  
            </ViewsDirective> 
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>  

        <div class="container p-5">
                
                
        

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-danger" id="exampleModalLabel">Nuevo Turno</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form onSubmit={handleSubmit}>
                <DropdownList
                dataKey="id"
                placeholder='Seleccionar Paciente'
                textField={person => person.nombre + ' ' +  person.apellido}
                value={search}
                onChange={searcher}
                data={results}
                />
                <div className='control-panel'>
                <div className='control-section'>
                    <div className='datetimepicker-control-section mt-3'>
                        <DateTimePickerComponent id="datetimepicker" placeholder="Seleccionar Fecha y Hora de Inicio"  onChange={selectdateStart}></DateTimePickerComponent>
                    </div>
                </div>
                </div>
                <div className='control-panel'>
                <div className='control-section'>
                    <div className='datetimepicker-control-section mt-3'>
                        <DateTimePickerComponent id="datetimepickerEnd" placeholder="Seleccionar Fecha y Hora de Final"  onChange={selectdateEnd}></DateTimePickerComponent>
                    </div>
                </div>
                </div>

                <textarea
                    className="comment-form-textarea"
                    placeholder='Descripcion'
                    value={data.description}
                    onChange={(e) => setText(e.target.value)}
                />

                <button type="submit" class="btn btn-primary" >Crear</button>
            </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" >Cerrar</button>
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}
export default Turnos