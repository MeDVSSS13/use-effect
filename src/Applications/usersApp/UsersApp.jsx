import React, { useEffect, useState } from 'react'
import { UserRaw } from '../../components/userCart/UserRaw';
import { v4 as uuidv4 } from 'uuid';
import "./usersApp.style.css"
import { UserForm } from '../../components/userForm/UserForm';

const url = "https://jsonplaceholder.typicode.com/users";

export const UsersApp = () => {
    useEffect(() => {
        getUsers();
    }, []);

    const [users, setUsers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // State to store the users data and loading status
    const getUsers = async () => {
        try {
            const  response = await fetch(url);
            if (!response.ok) throw new Error("HTTP error " + response.status);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const deletUser = (id) => {
        let filteredUsers = users.filter((item) => item.id !== id);
        setUsers(filteredUsers);
    }

    const addUser =  (newUser) => {
        newUser.id = uuidv4().slice(0, 5);
        setUsers([...users, newUser]);
        setIsFormOpen(false);
    }


    console.log(users[0])


  return (
      <div className='users-app'>
          <header>
              <h1>Users App</h1>
              <button style={{width: "50px"}} onClick={()=> setIsFormOpen(!isFormOpen)}>+</button>
          </header>
          {/* Show form when button clicked */}
          
          {isFormOpen ? <UserForm addUser={addUser} /> : null}

              <table>
                <tr className='headers'>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Salary</th>
                  <th>Marital Status</th>
                  <th>Gender</th>
                    <th>Actions</th>
                </tr>
                {
                    users.map((el, index) => {
                        return (
                            <UserRaw key={index}
                                id={el.id}
                                email={el.email}
                                phone={el.phone}
                                name={el.name}
                                company={el.company.name}
                                maritalStatus={el.maritalStatus ? el.maritalStatus : "unknown"}
                                onDelete={() => deletUser(el.id)} />
                        )
                    })
                }
            
               </table>
        </div>
   )
}
