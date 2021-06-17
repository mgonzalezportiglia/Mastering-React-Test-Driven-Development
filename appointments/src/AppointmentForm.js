import React, { useState } from 'react';

export const AppointmentForm = ({
    selectableServices,
    service,
    onSubmit
}) => {

    const [serviceSelected, setServiceSelected] = useState({ service })

    const handleChange = ({ target }) => {
        setServiceSelected((service) => ({
            ...service,
            [target.name]: target.value
        }))
    }

    return <form id="appointment" onSubmit={() => onSubmit(serviceSelected)}>
        <label htmlFor="service">Service</label>
        <select
            id="service"
            name="service"
            value={service}
            onChange={handleChange}>
            <option />
            {selectableServices.map(s => (
                <option key={s}>{s}</option>
            ))}
        </select>
    </form >
};

AppointmentForm.defaultProps = {
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions'
    ]
}