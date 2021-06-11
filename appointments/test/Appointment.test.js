import React from 'react'
import ReactDOM from 'react-dom'

import { Appointment } from '../src/Appointment'

describe('Appointment', () => {

    let customer;
    let container;

    beforeEach(() => {
        container = document.createElement('div')
    })

    const render = (component) => (
        ReactDOM.render(container, component)
    )

    it('renders the customer first name', () => {
        /*
            component: es un fragmento JSX que toma nuestro customer como prop.
        */
        customer = { firstName: 'Ashley' };

        render(<Appointment customer={customer} />)

        expect(container.textContent).toMatch('Ashley')
    });

    it('renders another customer first name', () => {

        customer = { firstName: 'Jordan' }

        render(<Appointment customer={customer} />)

        expect(container.textContent).toMatch('Jordan')

    })
})