import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            console.log(data.sales);
            setSales(data.sales);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson First Name</th>
                    <th>Salesperson Last Name</th>
                    <th>Salesperson Employee ID</th>
                    <th>Customer First Name</th>
                    <th>Customer Last Name</th>
                    <th>Automobile VIN</th>
                    <th>Price</th>
                    <th>Sold</th>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.first_name}</td>
                            <td>{sale.salesperson.last_name}</td>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.customer.first_name}</td>
                            <td>{sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                            <td>{sale.automobile.sold ? 'Yes' : 'No'}</td>
                            <td>{sale.id}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default SalesList;
