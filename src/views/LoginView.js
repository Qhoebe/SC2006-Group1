import React from 'react'
import {Link} from 'react-router-dom'

function LoginView() {
    return (
       <div className="p-2 flex flex-col justify-center items-center">
       <form className="grid grid-cols-2 gap-4 items-center">
  <h1 className="col-span-2 text-2xl font-bold">Login</h1>

  <label className="col-span-1">
    UserID:
    <input
      type="email"
      placeholder="Enter your username"
      className="w-full"
    />
  </label>
  <label className="col-span-1">
    Password:
    <input
      type="password"
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
            
        </div>
      );
}

export default LoginView