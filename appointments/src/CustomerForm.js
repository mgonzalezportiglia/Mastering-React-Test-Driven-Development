import React, { useState } from 'react'

export const CustomerForm = ({ firstName, onSubmit, lastName, phone }) => {

    const [customer, setCustomer] = useState({ firstName, lastName, phone })

    const onChangeFirstNameHandler = ({ target }) =>
        setCustomer(customer => ({
            ...customer,
            firstName: target.value
        }))

    const onChangeLastNameHandler = ({ target }) =>
        setCustomer(customer => ({
            ...customer,
            lastName: target.value
        }))

    const onChangePhoneNumberHandler = ({ target }) =>
        setCustomer(customer => ({
            ...customer,
            phone: target.value
        }))


    return <form id="customer" onSubmit={() => onSubmit(customer)}>
        <label htmlFor="firstName">First name</label>
        <input
            id="firstName"
            name="firstName"
            value={customer.firstName}
            onChange={onChangeFirstNameHandler}
        />
        <label htmlFor="lastName">Last name</label>
        <input
            id="lastName"
            name="lastName"
            value={customer.lastName}
            onChange={onChangeLastNameHandler}
        />
        <label htmlFor="phone">Phone number</label>
        <input
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={onChangePhoneNumberHandler}
        />
    </form>
}