import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function SalespersonList() {
    const [salespeople, setSalespeople] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            // console.log(data.salespeople);
            setSalespeople(data.salespeople);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map(salesperson => {
                    return (
                        <tr key={salesperson.id}>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                            <td>{salesperson.employee_id}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default SalespersonList;
