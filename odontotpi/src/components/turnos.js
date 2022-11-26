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
import emailjs from 'emailjs-com';
import * as numberingSystems from '../../node_modules/cldr-data/supplemental/numberingSystems.json';
import * as gregorian from '../../node_modules/cldr-data/main/es/ca-gregorian.json';
import * as numbers from '../../node_modules/cldr-data/main/es/numbers.json';
import * as timeZoneNames from '../../node_modules/cldr-data/main/es/timeZoneNames.json';
import * as weekData from 'cldr-data/supplemental/weekData.json';

import { extend, loadCldr, L10n } from "@syncfusion/ej2-base";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames, weekData);

L10n.load({
  es: {
    schedule: {
      day: "Día",
      week: "Semana",
      workWeek: "Semana de trabajo",
      month: "Mes",
      agenda: "Agenda",
      weekAgenda: "Agenda de la semana",
      workWeekAgenda: "Agenda de la semana laboral",
      monthAgenda: "Agenda del mes",
      today: "Hoy",
      noEvents: "No hay eventos",
      emptyContainer: "No hay eventos programados para este día.",
      allDay: "Todo el dia",
      start: "comienzo",
      end: "Final",
      more: "más",
      close: "Cerca",
      cancel: "Cancelar",
      noTitle: "(Sin título)",
      delete: "Eliminar",
      deleteEvent: "Este evento",
      deleteMultipleEvent: "Eliminar múltiples eventos",
      selectedItems: "Artículos seleccionados",
      deleteSeries: "Serie completa",
      edit: "Editar",
      editSeries: "Serie completa",
      editEvent: "Este evento",
      createEvent: "Crear",
      subject: "Tema",
      addTitle: "Añadir título",
      moreDetails: "Más detalles",
      save: "Salvar",
      editContent: "¿Cómo le gustaría cambiar la cita en la serie?",
      deleteContent: "¿Seguro que quieres eliminar este evento?",
      deleteMultipleContent:
        "¿Estás seguro de que deseas eliminar los eventos seleccionados?",
      newEvent: "Nuevo evento",
      title: "Título",
      location: "Ubicación",
      description: "Descripción",
      timezone: "Zona horaria",
      startTimezone: "Zona horaria de inicio",
      endTimezone: "Zona horaria final",
      repeat: "Repetir",
      saveButton: "Salvar",
      cancelButton: "Cancelar",
      deleteButton: "Eliminar",
      recurrence: "Reaparición",
      wrongPattern: "El patrón de recurrencia no es válido.",
      seriesChangeAlert:
        "¿Desea cancelar los cambios realizados en instancias específicas de esta serie y volver a vincularlos con toda la serie?",
      createError:
        "La duración del evento debe ser más corta que la frecuencia con la que ocurre. Acorte la duración o cambie el patrón de recurrencia en el editor de eventos de recurrencia.",
      sameDayAlert:
        "Dos ocurrencias del mismo evento no pueden ocurrir en el mismo día.",
      editRecurrence: "Editar recurrencia",
      repeats: "Repite",
      alert: "Alerta",
      startEndError:
        "La fecha de finalización seleccionada ocurre antes de la fecha de inicio.",
      invalidDateError: "El valor de la fecha ingresada no es válido.",
      blockAlert:
        "Los eventos no se pueden programar dentro del rango de tiempo bloqueado.",
      ok: "Okay",
      yes: "si",
      no: "No",
      occurrence: "Ocurrencia",
      series: "Serie",
      previous: "Anterior",
      next: "próximo",
      timelineDay: "Día de la línea de tiempo",
      timelineWeek: "Semana de la línea de tiempo",
      timelineWorkWeek: "Semana laboral cronológica",
      timelineMonth: "Mes de la línea de tiempo",
      timelineYear: "Cronología Año",
      editFollowingEvent: "Eventos siguientes",
      deleteTitle: "Eliminar evento",
      editTitle: "Editar evento",
      beginFrom: "Comience desde",
      endAt: "Termina en"
    },
    recurrenceeditor: {
      none: "Ninguna",
      daily: "Diario",
      weekly: "Semanal",
      monthly: "Mensual",
      month: "Mes",
      yearly: "Anual",
      never: "Nunca",
      until: "Hasta",
      count: "Contar",
      first: "primero",
      second: "Segundo",
      third: "Tercero",
      fourth: "Cuarto",
      last: "Último",
      repeat: "Repetir",
      repeatEvery: "Repite cada",
      on: "Repetir en",
      end: "Final",
      onDay: "Día",
      days: "Dias)",
      weeks: "Semanas)",
      months: "Meses)",
      years: "Años)",
      every: "cada",
      summaryTimes: "veces)",
      summaryOn: "en",
      summaryUntil: "hasta",
      summaryRepeat: "Repite",
      summaryDay: "dias)",
      summaryWeek: "semanas)",
      summaryMonth: "meses)",
      summaryYear: "años)",
      monthWeek: "Mes Semana",
      monthPosition: "Posición del mes",
      monthExpander: "Expansor de mes",
      yearExpander: "Expansor de año",
      repeatInterval: "Intervalo de repetición"
    },
    calendar: {
      today: "Hoy"
    }
  }
});

const Turnos = () => {

 

    const [enviarMail, setEnviarMail] = useState(false)
    const [turnoAgregado, setTurnoAgregado] = useState(false)
    const [turnoNoAgregado, setTurnoNoAgregado] = useState(false)

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
        console.log(data)
        const response2 = await fetch('http://localhost:8080/paciente')
        const data2 = await response2.json()
        setPacientes(data2)

    }

    const selectdateStart = (e) =>{
        const newData = {...data}
        newData['startTime'] = e.value
        
        const datetime = new Date(e.value)
        const newDate = new Date(datetime.setHours(datetime.getHours()+1))
        console.log(newData)
        newData['endTime'] = newDate
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
            const newData = {...data}
            newData['startTime'] = new Date(data.startTime.setHours(data.startTime.getHours()-3))
            newData['endTime'] = new Date(data.endTime.setHours(data.endTime.getHours()-3))
            setData(newData)
            axios.post('http://localhost:8080/paciente/' + paciente.legajo + '/turno/save',data)
            .then((response) => {
                if(enviarMail){sendEmail()}
                setData({
                    subject : "",
                    startTime : "",
                    endTime : "",
                    description : ""
                })
                setEnviarMail(false)
                showData()
                setPaciente({})
                setSearch('')
                setTurnoAgregado(true)
            })
            .catch(err => setTurnoNoAgregado(true))
        }
        catch{setTurnoNoAgregado(true)}

        
    }

    const sendEmail = () => {
  
      emailjs.send('gmail', 'template_7989sd7', {
        subject: "Aviso de Nuevo Turno",
        message: "Hola " + data.subject + "\n \n" + "Se le ha asignado un nuevo turno el dia " +  new Date(data.startTime).toLocaleString() + "\n \nSaludos,\n OdontoTIP",
        to: paciente.mail,
        }, '1gEZ34KTxymRFv7vv')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    const handleCruz = () =>{
      setTurnoAgregado(false)
      setTurnoNoAgregado(false)
    }


    return(
        <div>
            <button type="button" class="btn btn-primary mt-3 mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Nuevo Turno
        </button>
        <ScheduleComponent currentView='Week' firstDayOfWeek={1} locale="es" eventSettings={{ dataSource: turnos} } popupOpen={false}>
            <ViewsDirective>
                <ViewDirective option='Day' startHour='09:00' endHour='20:00' locale="es"></ViewDirective>    
                <ViewDirective option='Week' startHour='09:00' endHour='20:00' locale="es"></ViewDirective>  
                <ViewDirective option='Month' startHour='09:00' endHour='20:00' locale="es"></ViewDirective>  
            </ViewsDirective> 
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>  

        <div class="container p-5">
                
                
        

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-dark" id="exampleModalLabel">Nuevo Turno</h5>
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
                        <DateTimePickerComponent id="datetimepicker" placeholder="Seleccionar Fecha y Hora de Inicio"  onChange={selectdateStart} locale='es' value={data.startTime}></DateTimePickerComponent>
                    </div>
                </div>
                </div>
                <div className='control-panel'>
                <div className='control-section'>
                    <div className='datetimepicker-control-section mt-3'>
                        <DateTimePickerComponent id="datetimepickerEnd" placeholder="Seleccionar Fecha y Hora de Final"  onChange={selectdateEnd} locale='es' value={new Date(data.endTime)}></DateTimePickerComponent>
                    </div>
                </div>
                </div>

                <textarea
                    className="comment-form-textarea"
                    placeholder='Descripcion'
                    value={data.description}
                    onChange={(e) => setText(e.target.value)}
                />
                <div class="form-check checkMail mb-4 mt-3">
                  <input class="form-check-input" type="checkbox" value={enviarMail} id="flexCheckDefault" onChange={()=> setEnviarMail(!enviarMail)}/>
                  <label class="form-check-label" for="flexCheckDefault" className='text-dark'>
                    Enviar aviso por mail
                  </label>
                </div>

                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Crear</button>
            </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" >Cerrar</button>
            </div>
        </div>
        </div>
        </div>
        </div>
        <div className='alertOdont'>
        {turnoAgregado && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Nuevo Turno Creado!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => handleCruz()}></button>
            </div>)
            }
          {turnoNoAgregado && (
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error! Turno no creado</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"  onClick={() => handleCruz()}></button>
          </div>)
          }
          </div>
        </div>
    )
}
export default Turnos