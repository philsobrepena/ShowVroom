import React, { useEffect, useState } from 'react';

function NewSaleForm() {
  const [automobile, setAutomobile] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [customer, setCustomer] = useState('');
  const [price, setPrice] = useState('');
  const [hasCreatedSale, setHasCreatedSale] = useState(false);

  const [automobiles, setAutomobiles] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch automobiles
    const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
    if (automobileResponse.ok) {
      const automobileData = await automobileResponse.json();
      setAutomobiles(automobileData.autos);
    }

    // Fetch salespeople
    const salespersonResponse = await fetch('http://localhost:8090/api/salespeople/');
    if (salespersonResponse.ok) {
      const salespersonData = await salespersonResponse.json();
      setSalespeople(salespersonData.salespeople);
    }

    // Fetch customers
    const customerResponse = await fetch('http://localhost:8090/api/customers/');
    if (customerResponse.ok) {
      const customerData = await customerResponse.json();
      setCustomers(customerData.customers);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      automobile,
      salesperson,
      customer,
      price
    };

    const saleUrl = 'http://localhost:8090/api/sales/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const saleResponse = await fetch(saleUrl, fetchOptions);
    if (saleResponse.ok) {
      setAutomobile('');
      setSalesperson('');
      setCustomer('');
      setPrice('');
      setHasCreatedSale(true);
      /////// on submit change sold trait of automobile instance to true
      const updateUrl = `http://localhost:8100/api/automobiles/${automobile}/`;
      const updateData = {
      ...automobile,
      sold: true,

    }
    ////// put request to update automobile data
    const updateOptions = {
      method: 'put',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await fetch(updateUrl, updateOptions);
  }


  };

  const handleAutomobileChange = (event) => {
    setAutomobile(event.target.value);
  };

  const handleSalespersonChange = (event) => {
    setSalesperson(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';
  if (hasCreatedSale) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
  }

  const unsoldAutomobiles = automobiles.filter((automobile) => !automobile.sold);

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form className={formClasses} onSubmit={handleSubmit} id="create-sale-form">
                <h1 className="card-title">Create a New Sale</h1>
                <p className="mb-3">Provide details for the new sale</p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <select
                        onChange={handleAutomobileChange}
                        value={automobile}
                        name="automobile"
                        id="automobile"
                        className="form-select"
                        required
                      >
                        <option value="">Choose an automobile</option>
                        {unsoldAutomobiles.map((automobile) => (
                          <option key={automobile.vin} value={automobile.vin}>
                            {automobile.vin}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="automobile">Automobile</label>
                    </div>
                  </div>
                  <div className="col">
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
                          <option key={salesperson.employee_id} value={salesperson.employee_id}>
                            {salesperson.first_name} {salesperson.last_name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="salesperson">Salesperson</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <select
                        onChange={handleCustomerChange}
                        value={customer}
                        name="customer"
                        id="customer"
                        className="form-select"
                        required
                      >
                        <option value="">Choose a customer</option>
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.first_name} {customer.last_name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="customer">Customer</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        onChange={handlePriceChange}
                        required
                        placeholder="Price"
                        type="text"
                        id="price"
                        name="price"
                        value={price}
                        className="form-control"
                      />
                      <label htmlFor="price">Price</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Submit!</button>
              </form>
              <div className={messageClasses} id="success-message">
                Congratulations! You've created a new sale!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSaleForm;
