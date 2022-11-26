import dental from '../images/odontologa.jpg';
import '../App.css';

const Inicio = () => {
    return(
        <div class="card mb-3 mt-5 homeStyle" >
        <div class="row g-0">
            <div class="col-md-6">
            <img src={dental} class="img-fluid rounded-start"/>
            </div>
            <div class="col-md-6">
            <div class="card-body">
                <h1 class="card-title text-dark">Bienvenido/a OdontoTIP</h1>
                <p class="card-text text-dark mt-3">Un sistema de autogestión web para la organización de tu consultorio odontológico.</p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <a class="card-text text-dark" href="http://localhost:3000/pacientes">Ir a Pacientes.</a>
                <br></br>
                <a class="card-text text-dark mt-5" href="http://localhost:3000/turnos">Ir a Turnos.</a>
            </div>
            </div>
        </div>
        </div>
    )
}
export default Inicio