import '../App.css';
import React, { useEffect, useState, onSubmit } from 'react';
import UseQuery from './useSearch';
import axios from 'axios';

const HistoriaClinica = () => {

    const query = UseQuery();

    const [data, setData] = useState({})
    const [historiaActualizado, setHistoriaActualizado] = useState(false)
  const [historiaNoActualizado, setHistoriaNoActualizado] = useState(false)

    useEffect(() => {getPaciente()},[]);

    const getPaciente = async () => {
    

        const response = await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')) + '/historiaClinica')
            const data = await response.json()
            setData(data)
        }

    const setTexto = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    
    const setCheck = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.checked
        setData(newData)
    };    

    const handleSubmit = (event) =>{
        event.preventDefault()
        try{
            axios.put('http://localhost:8080/paciente/'+ (query.toString().replace('q=', '')) + '/historiaClinica',data)
            .then((response) => {
                setHistoriaActualizado(true)
                setData(data)
              })
              .catch(err => setHistoriaNoActualizado(true))
          
        }
        catch{}

        
    }

    const handleCruz = () =>{
        setHistoriaActualizado(false)
        setHistoriaNoActualizado(false)
      }
    

    return(

        
        <div>
        <h1 className="text-dark mt-3">Historia Clinica</h1>
        <div className="container mt-2 historia">
        <form onSubmit={handleSubmit}>
        <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label mt-2">¿Cuando fue la ultima vez que recibio tratamiento odontologico?</label>
            <div class="col-sm-10">
            <textarea
                    className="comment-form-textarea mt-3"
                    placeholder='Descripcion'
                    value={data.ultimoTratamiento}
                    id='ultimoTratamiento'
                    onChange={(e) => setTexto(e)}
                    />
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Esta en tratamiento médico?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="enTratamientoMedico" checked={data.enTratamientoMedico} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <label for="validationDefault02"  class="col-sm-2 col-form-label">¿Por qué causa?</label>
            <div class="col-md-4">
                <input type="text" class="form-control" id="causaTratamiento" placeholder="Causas" value={data.causaTratamiento} onChange={(e) => setTexto(e)}/>
            </div>
        </div>

        <div class="form-group row mt-2">
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Toma medicamentos?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="medicamentos" checked={data.medicamentos} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <label for="validationDefault02"  class="col-sm-2 col-form-label">¿Cuales?</label>
            <div class="col-md-4">
                <input type="text" class="form-control" id="cualesMedicamentos" placeholder="Medicamentos" value={data.cualesMedicamentos} onChange={(e) => setTexto(e)}/>
            </div>
        </div>

        <div class="form-group row mt-2">
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Fue operado/a en los ultimos 10 años?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="fueOperado" checked={data.fueOperado} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <label for="validationDefault02"  class="col-sm-2 col-form-label">¿Por qué Causa?</label>
            <div class="col-md-4">
                <input type="text" class="form-control" id="causaOperaciones" placeholder="Causas" value={data.causaOperaciones} onChange={(e) => setTexto(e)}/>
            </div>
        </div>

        <div class="form-group row mt-2">
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Tiene alguna alergia?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="alergico" checked={data.alergico} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <label for="validationDefault02"  class="col-sm-2 col-form-label">¿Cuales?</label>
            <div class="col-md-4">
                <input type="text" class="form-control" id="alergias" placeholder="Alergias" value={data.alergias} onChange={(e) => setTexto(e)}/>
            </div>
        </div>

        <div class="form-group row mt-2">
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Tuvo hemorragias?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="hemorragias" checked={data.hemorragias} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Recibio transfuciones?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="recibioTransfusion" checked={data.recibioTransfusion} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Transtornos Psiquiatricos?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="trastornosPsi" checked={data.trastornosPsi} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Diabetes?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="diabetes" checked={data.diabetes} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
        </div>

        <div class="form-group row mt-2">
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Dolencias Cardiacas?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="problemasCardiacos" checked={data.problemasCardiacos} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Hemofilía?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="hemofilia" checked={data.hemofilia} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Problemas neurológicos?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="problemasNeurologicos" checked={data.problemasNeurologicos} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Problemas renales?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="problemasRenales" checked={data.problemasRenales} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
        </div>

        <div class="form-group row mt-2">
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Diálisis?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="dialisis" checked={data.dialisis} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Hepatitis?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="hepatitis" checked={data.hepatitis} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Tuberculosis?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="tuberculosis" checked={data.tuberculosis} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Neumonía?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="neumonia" checked={data.neumonia} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
        </div>

        <div class="form-group row mt-2">
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Sífilis?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="sifilis" checked={data.sifilis} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Hipertensión?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="hipertension" checked={data.hipertension} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿HIV?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="hiv" checked={data.hiv} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Está Embarazada?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="embarazada" checked={data.embarazada} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
            <div class="col-sm-3 mt-2">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    ¿Infecciones a Repetición?
                </label>
                <input class="form-check-input checkRight" type="checkbox" id="infeccionsARepeticion" checked={data.infeccionsARepeticion} onChange={(e) => setCheck(e)}/>
                </div>
            </div>
        </div>

        <div class="form-group row mt-2 mb-3">
            <label for="colFormLabel" class="col-sm-2 col-form-label ">Presión Arterial Máxima</label>
            <input type="number" class="col-sm-1 form-control-sm" id="presionArterialMax" placeholder='mmHg' value={data.presionArterialMax} onChange={(e) => setTexto(e)}/>
       
            <label for="colFormLabel" class="col-sm-2 col-form-label ">Presión Arterial Mínima</label>
            <input type="number" class="col-sm-1 form-control-sm" id="presionArterialMin" placeholder='mmHg' value={data.presionArterialMin} onChange={(e) => setTexto(e)}/>

            <label for="colFormLabel" class="col-sm-2 col-form-label ">Pulso</label>
            <input type="number" class="col-sm-1 form-control-sm" id="pulso" placeholder='L.M' value={data.pulso} onChange={(e) => setTexto(e)}/>

            <label for="colFormLabel" class="col-sm-2 col-form-label ">Frecuencia Respiratoria</label>
            <input type="number" class="col-sm-1 form-control-sm" id="frecuenciaRespiratoria" placeholder='R.M' value={data.frecuenciaRespiratoria} onChange={(e) => setTexto(e)}/>
        </div>



        <button type="submit" class="btn btn-primary mb-3">Guardar</button>
        </form>
    </div>
    <div className='alertOdont'>
            {historiaActualizado && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Historia Clinica Actualizada!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => handleCruz()}></button>
            </div>)
            }
            {historiaNoActualizado && (
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error! Historia Clinica no Actualizada</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"  onClick={() => handleCruz()}></button>
            </div>)
            }
        </div>
    </div>
    )
}
export default HistoriaClinica