import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function LoginView() {
  const [loginStatusMessage, setLoginStatusMessage] = useState('')

  async function handleLogin(event){
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(event.target); // Get the form data
    const submitData = Object.fromEntries(formData); // Convert FormData to object
  
    try {
        const response = await fetch('user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData), // Convert the object to JSON string
        }).then((response) => response.text())
        .then((data) => {setLoginStatusMessage(data); console.log(data); });
  
  
        // Handle success, e.g., show a success message or redirect to a new page
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error, e.g., show an error message
    }
  }


    return (
       <div className="p-2 flex flex-col justify-center items-center">
       <form onSubmit={handleLogin} className="grid grid-cols-2 gap-4 items-center">
  <h1 className="col-span-2 text-2xl font-bold">Login</h1>

  <label className="col-span-1">
    UserID:
    <input
      type="text"
      name="username"
      placeholder="Enter your username"
      className="w-full"
    />
  </label>
  <label className="col-span-1">
    Password:
    <input
      type="password"
      name="password"
      placeholder="Enter your password"
      className="w-full"
    />
  </label>
  <button type="submit" className="col-span-2 p-2 hover:bg-gray-300 rounded-lg">Login</button>
</form>

        
        <Link to='/signup'>
            <button className="p-2 hover:bg-gray-300 rounded-lg">
            Sign up</button>
            </Link>

            {loginStatusMessage&&<div>
             <h1 className="text-red-500">{loginStatusMessage}</h1>
            </div>}
            
        </div>
      );
}


export default LoginView
