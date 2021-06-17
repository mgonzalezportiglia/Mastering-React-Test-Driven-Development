import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';
import ReactTestUtils from 'react-dom/test-utils'

describe('AppointmentForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const findOption = (dropdownNode, textContent) => {
        const options = Array.from(dropdownNode.childNodes)

        return options.find(option => option.textContent === textContent)
    }

    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = name => form('appointment').elements[name];
    const label = fieldName => container.querySelector(`label[for="${fieldName}"]`)

    it('renders a form', () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    });

    describe('service field', () => {
        it('renders as a select box', () => {
            render(<AppointmentForm />);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        });

        it('initially has a blank value chosen', () => {
            render(<AppointmentForm />)

            const firstNode = field('service').childNodes[0]

            expect(firstNode.value).toEqual('')
            expect(firstNode.selected).toBeTruthy()
        })

        it('list all salon services', () => {
            const selectableServices = [
                "Cut",
                "Blow-dry"
            ]

            render(<AppointmentForm selectableServices={selectableServices} />)

            const optionNodes = Array.from(
                field('service').childNodes
            )

            const renderedServices = optionNodes.map(
                node => node.textContent
            )

            expect(renderedServices).toEqual(
                expect.arrayContaining(selectableServices)
            )

        })

        it('pre-selects the existing value', () => {
            const services = ['Cut', 'Blow-dry']

            render(<AppointmentForm selectableServices={services} service="Blow-dry" />)

            const option = findOption(field('service'), 'Blow-dry')

            expect(option.selected).toBeTruthy()
        })

        it('renders a label', () => {
            render(<AppointmentForm />)

            expect(label('service')).not.toBeNull()
            expect(label('service').textContent).toEqual('Service')
        })

        it('assings an id that matches the label id', () => {
            render(<AppointmentForm />)

            expect(field('service').id).toEqual('service')
        })

        it('saves existing value when submitted', async () => {

            expect.hasAssertions()

            render(<AppointmentForm
                service="Beard trim"
                onSubmit={({ service }) =>
                    expect(service).toEqual('Beard trim')
                }
            />)

            await
                ReactTestUtils.Simulate.submit(form('appointment'))
        })

        it('saves new value when submitted', async () => {
            expect.hasAssertions()

            render(<AppointmentForm
                service="Beard"
                onSubmit={({ service }) => {
                    expect(service).toEqual('Cut & color')
                }}
            />)

            await
                ReactTestUtils.Simulate.change(field('service'), { target: { value: 'Cut & color', name: 'service' } })

            await
                ReactTestUtils.Simulate.submit(form('appointment'))


        })
    });
});
