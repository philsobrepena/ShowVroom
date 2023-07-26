import React, { useState } from 'react';

function NewCustomerForm() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name,
      last_name,
      address,
      phone_number
    };

    const customerUrl = 'http://localhost:8090/api/customers/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const customerResponse = await fetch(customerUrl, fetchOptions);
    if (customerResponse.ok) {
      setFirstName('');
      setLastName('');
      setAddress('');
      setPhoneNumber('');
      setHasSignedUp(true);
    }
  };

  const handleChangeFirstName = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleChangeLastName = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleChangeAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handleChangePhoneNumber = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';
  if (hasSignedUp) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
  }

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form className={formClasses} onSubmit={handleSubmit} id="create-customer-form">
                <h1 className="card-title">Add a New Customer</h1>
                <p className="mb-3">Tell us about the customer</p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeFirstName} required placeholder="First Name" type="text" id="first_name" name="first_name" className="form-control" />
                      <label htmlFor="first_name">First Name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeLastName} required placeholder="Last Name" type="text" id="last_name" name="last_name" className="form-control" />
                      <label htmlFor="last_name">Last Name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeAddress} required placeholder="Address" type="text" id="address" name="address" className="form-control" />
                      <label htmlFor="address">Address</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangePhoneNumber} required placeholder="Phone Number" type="text" id="phone_number" name="phone_number" className="form-control" />
                      <label htmlFor="phone_number">Phone Number</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Submit!</button>
              </form>
              <div className={messageClasses} id="success-message">
                Congratulations! You've added a new customer!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCustomerForm;
