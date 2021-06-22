import React, { useState } from 'react';

import { TimeSlotTable } from '../src/TimeSlotTable'

export const AppointmentForm = ({
    selectableServices,
    service,
    onSubmit,
    salonOpensAt,
    salonClosesAt,
    today
}) => {
    const [appointment, setAppointment] = useState({ service });

    const handleServiceChange = ({ target: { value } }) =>
        setAppointment(appointment => ({
            ...appointment,
            service: value
        }));

    return (
        <form id="appointment" onSubmit={() => onSubmit(appointment)}>
            <label htmlFor="service">Salon service</label>
            <select
                name="service"
                id="service"
                value={service}
                onChange={handleServiceChange}>
                <option />
                {selectableServices.map(s => (
                    <option key={s}>{s}</option>
                ))}
            </select>
            <TimeSlotTable
                salonOpensAt={salonOpensAt}
                salonClosesAt={salonClosesAt}
                today={today}
            />
        </form>
    );
};

AppointmentForm.defaultProps = {
    today: new Date(),
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions'
    ]
};
