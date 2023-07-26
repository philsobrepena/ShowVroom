import React, { useEffect, useState } from 'react';

function NewSalespersonForm(){
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [employee_id, setEmployeeId] = useState('');
    const [hasSignedUp, setHasSignedUp] = useState('');

const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        first_name,
        last_name,
        employee_id
    };

    const salespersonUrl = 'http://localhost:8090/api/salespeople/'
    const fetchOptions={
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const salesPersonResponse = await fetch(salespersonUrl, fetchOptions);
    if (salesPersonResponse.ok) {
        setFirstName('');
        setLastName('');
        setEmployeeId('');
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

const handleChangeEmployeeId = (event) => {
    const value = event.target.value;
    setEmployeeId(value);
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
            <form className={formClasses} onSubmit={handleSubmit} id="create-salesperson-form">
              <h1 className="card-title">Add a New Salesperson</h1>
              <p className="mb-3">Tell us about the salesperson</p>
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
                        <input onChange={handleChangeEmployeeId} required placeholder="Employee ID" type="text" id="employee_id" name="employee_id" className="form-control" />
                        <label htmlFor="employee_id">Employee ID</label>
                    </div>
                </div>
              </div>
              <button className="btn btn-lg btn-primary">Submit!</button>
            </form>
            <div className={messageClasses} id="success-message">
              Congratulations! You've added a new salesperson!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default NewSalespersonForm;
