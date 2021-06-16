import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const fieldGeneric = name => form('customer').elements[name]
    const labelFor = formElement =>
        container.querySelector(`label[for="${formElement}"]`);

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    const itRendersAsATextBox = fieldName => {
        it('renders as a text box', () => {
            render(<CustomerForm />)

            expect(expectToBeInputFieldOfTypeText(fieldGeneric(fieldName)))
        });
    }

    const itIncludesTheExistingValue = fieldName => {
        it('includes the existing value', () => {

            render(<CustomerForm {...{ [fieldName]: 'value' }} />)

            expect(fieldGeneric(fieldName).value).toEqual('value')
        });
    }

    const itRendersALabel = (fieldName, fieldText) => {
        it('renders a label', () => {

            render(<CustomerForm />)

            expect(labelFor(fieldGeneric(fieldName).name)).not.toBeNull()
            expect(labelFor(fieldGeneric(fieldName).name).textContent).toMatch(fieldText)
        });
    }

    const itAssingsAnIdThatMatchesTheLabelIdWithTheField = fieldName => {
        it('assigns an id that matches the label id with the field', () => {

            render(<CustomerForm />)

            expect(fieldGeneric(fieldName).id).toEqual(fieldName)
        });
    }

    const itSavesExistingValueWhenSubmitted = (fieldName, value) => {
        it('saves existing value when submitted', async () => {
            expect.hasAssertions()

            render(<CustomerForm
                {...{ [fieldName]: value }}
                onSubmit={props =>
                    expect(props[fieldName]).toEqual(value)
                }
            />)

            await
                ReactTestUtils.Simulate.submit(form('customer'))
        });
    }

    const itSavesNewValueWhenSubmitted = (fieldName, value) => {
        it('saves new value when submitted', async () => {
            expect.hasAssertions()

            render(<CustomerForm
                {...{ [fieldName]: 'initialValue' }}
                onSubmit={props =>
                    expect(props[fieldName]).toEqual(value)
                }
            />)

            await
                ReactTestUtils.Simulate.change(fieldGeneric(fieldName), { target: { value } })

            await
                ReactTestUtils.Simulate.submit(form('customer'))
        });
    }

    describe('first name field', () => {
        itRendersAsATextBox('firstName')
        itIncludesTheExistingValue('firstName')
        itRendersALabel('firstName', 'First name')
        itAssingsAnIdThatMatchesTheLabelIdWithTheField('firstName')
        itSavesExistingValueWhenSubmitted('firstName', 'firstName')
        itSavesNewValueWhenSubmitted('firstName', 'anotherValue')
    })

    describe('last name field', () => {
        itRendersAsATextBox('lastName')
        itIncludesTheExistingValue('lastName')
        itRendersALabel('lastName', 'Last name')
        itAssingsAnIdThatMatchesTheLabelIdWithTheField('lastName')
        itSavesExistingValueWhenSubmitted('lastName', 'initialLastName')
        itSavesNewValueWhenSubmitted('lastName', 'anotherLastName')
    })

    describe('phone number field', () => {
        itRendersAsATextBox('phone')
        itIncludesTheExistingValue('phone')
        itRendersALabel('phone', 'Phone number')
        itAssingsAnIdThatMatchesTheLabelIdWithTheField('phone')
        itSavesExistingValueWhenSubmitted('phone', 'initialPhoneNumber')
        itSavesNewValueWhenSubmitted('phone', 'anotherPhoneNumber')
        
    })

});
