import React, { useState } from 'react'
import "./userForm.style.css"

const defaultData = {
    id: "",
    name: "",
    email: "",
    phone: "",
    company: {
        name: ""
    },
    salary: null,
    maritalStatus: "",
    gender: "",
}

export const UserForm = ({ addUser }) => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState(defaultData);

    // Handles input changes for each field in the form
    const onChange = (e) => {
    const { name, value, type } = e.target;
    setUserData((prevData) => ({
        ...prevData,
        [name]: type === 'radio' ? value : value,  // Handle radio inputs
    }));
    }

    // Moves to next step of the form
    const onNextStep = () => {
    setStep(2);
  };

  const onPrevStep = () => {
    setStep(1);
  };
    // Submits user data and adds it to state
    const onSubmitHandler = (e) => {
        e.preventDefault();
        addUser(userData);
        setUserData(defaultData);
    }

    return (
      <dialog open className='pop-up'>
            <form action="" onSubmit={onSubmitHandler}>
                {step === 1 && (
          <div className='step-1'>
            <input type="text" name='name' value={userData.name} onChange={onChange} placeholder="Name" /><br />
            <input type="email" name='email' value={userData.email} onChange={onChange} placeholder="Email Address" /><br />
            <input type="tel" name='phone' value={userData.phone} onChange={onChange} placeholder='Phone number' />
            <div className="step-buttons">
              <button type="button" onClick={onNextStep}>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='step-2'>
            <input type="text" name='company' value={userData.company.name} onChange={onChange} placeholder="Company" /><br />
            <input type="number" name='salary' value={userData.salary} onChange={onChange} placeholder="Salary" /><br />
            <input type="text" name='maritalStatus' value={userData.maritalStatus} onChange={onChange} placeholder="Marital Status" /><br />
            <input type="text" name='gender' value={userData.gender} onChange={onChange} placeholder="Gender" /><br />
            <div className="step-buttons">
              <button type="button" onClick={onPrevStep}>Prev</button>
              <button type='submit'>Add user</button>
            </div>
          </div>
        )}
                
          </form>
    </dialog>
  )
}

                    