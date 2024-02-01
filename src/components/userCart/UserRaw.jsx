import React from 'react'

export const UserRaw = ({id, name, email, phone, company, salary, maritalStatus, gender, onDelete}) => {
    return (
        <tr>
            <td className='id'>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{company}</td>
            <td>{salary}</td>
            <td>{maritalStatus}</td>
            <td>{gender}</td>
            <th><button onClick={onDelete}>Delete</button></th>
        </tr>
    );
}
