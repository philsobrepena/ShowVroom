import React, { useEffect, useState } from 'react';

function SalesByPersonList() {
  const [sales, setSales] = useState([]);
  const [salesperson, setSalesperson] = useState('');
  const [salespeople, setSalespeople] = useState([]);

  const fetchData = async () => {
    // Fetch sales
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    }
    // Fetch salespeople
    const salespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
    if (salespeopleResponse.ok) {
      const salespersonData = await salespeopleResponse.json();
      setSalespeople(salespersonData.salespeople);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSalespersonChange = (event) => {
    setSalesperson(event.target.value);
  };

  const salespersonSales = sales.filter(
    (sale) => sale.salesperson.employee_id.toString() === salesperson
  );

  return (
    <div>
      <div className="form-floating mb-3">
        <select
          onChange={handleSalespersonChange}
          value={salesperson}
          name="salesperson"
          id="salesperson"
          className="form-select"
          required
        >
          <option value="">Choose a salesperson</option>
          {salespeople.map((salesperson) => (
            <option key={salesperson.employee_id} value={salesperson.employee_id.toString()}>
              {salesperson.first_name} {salesperson.last_name}
            </option>
          ))}
        </select>
        <label htmlFor="salesperson">Select a salesperson</label>
      </div>

      {salespersonSales.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson First Name</th>
              <th>Salesperson Last Name</th>
              <th>Customer First Name</th>
              <th>Customer Last Name</th>
              <th>Automobile VIN</th>
              <th>Price</th>
              <th>Sold</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {salespersonSales.map((sale) => {
              return (
                <tr key={sale.id}>
                  <td>{sale.salesperson.first_name}</td>
                  <td>{sale.salesperson.last_name}</td>
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
      ) : (
        <p>No sales found for the selected salesperson.</p>
      )}
    </div>
  );
}

export default SalesByPersonList;
