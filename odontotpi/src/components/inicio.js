import dental from '../images/dental-equipment.jpg';
import '../App.css';

const Inicio = () => {
    return(
        <div className=' container mt-5 container-home'>
            <img src={dental} className="img-home"/>
            <h1 class="centered text-dark title-home">Bienvenido a OdontoTPI!<br></br><br></br>
            Un sistema de autogestión web para la organización de tu consultorio odontológico.</h1>
        </div>
    )
}
export default Inicio