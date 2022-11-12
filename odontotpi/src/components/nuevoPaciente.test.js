import { render , screen} from "@testing-library/react"
import NuevoPaciente from "./nuevoPaciente"
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";


describe('nuevoPaciente', () =>{
    it('Cuando se quiere guardar un paciente con mail erroneo, aparece el error de mail invalido', () =>{
        render(<Router><NuevoPaciente/></Router>)
        const mail = screen.getByTestId('mail')
        userEvent.type(mail , 'prueba')
        const submit = screen.getByTestId('submit')
        submit.submit()
        const submit2 = screen.getByTestId("fail-mail")
    })

    it('Cuando se quiere guardar un paciente con mail correcto, no aparece el error de mail invalido', () =>{
        render(<Router><NuevoPaciente/></Router>)
        const mail = screen.getByTestId('mail')
        userEvent.type(mail , 'prueba@live.com')
        const submit = screen.getByTestId('submit')
        submit.submit()
        expect(() => screen.getByTestId('fail-mail')).toThrow('Unable to find an element');
    })
})