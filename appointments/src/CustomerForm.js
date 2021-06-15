import React from 'react';

export const CustomerForm = ({ firstName }) => (
    <form id="customer">
        <label htmlFor="firstName">First name</label>
        <input
            name="firstName"
            id="firstName"
            type="text"
            value={firstName}
            readOnly
        />
    </form>
)
