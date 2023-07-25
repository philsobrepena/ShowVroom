import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function AutomobileList() {
    const [autos, setAutos] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setAutos(data.autos);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>color</th>
                    <th>year</th>
                    <th>bin</th>
                    <th>model id</th>
                    <th>model name</th>
                    <th>model picture_url</th>
                    <th>manufacturer id</th>
                    <th>manufacturer name</th>
                    <th>sold</th>
                </tr>
            </thead>
            <tbody>
                {autos.map(auto => {
                    return (
                        <tr key={auto.id}>
                            <td>{auto.id}</td>
                            <td>{auto.color}</td>
                            <td>{auto.year}</td>
                            <td>{auto.bin}</td>
                            <td>{auto.model.id}</td>
                            <td>{auto.model.name}</td>
                            <td>
                                <img src={auto.model.picture_url} alt={auto.model.name} />
                            </td>
                            <td>{auto.model.manufacturer.id}</td>
                            <td>{auto.model.manufacturer.name}</td>
                            <td>{auto.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AutomobileList;
