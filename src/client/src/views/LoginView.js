import { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";

function LoginView() {
  const [loginStatusMessage, setLoginStatusMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target); // Get the form data
    const submitData = Object.fromEntries(formData); // Convert FormData to object

    try {
      const response = await fetch("user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData), // Convert the object to JSON string
      })
        .then((response) => response.json())
        .then((data) => {
          setLoginStatusMessage(data.message);
          if (data.message === "success") {
            //set current user
            window.sessionStorage.setItem("username", data.token);
            window.location.href = "/";
          }
        });

      // Handle success, e.g., show a success message or redirect to a new page
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show an error message
    }
  }

  return (
    <div>
      <div className="p-2 flex flex-col justify-center items-center">
        <h1 className="col-span-2 text-2xl font-bold py-10 ">Login</h1>
        <form
          onSubmit={handleLogin}
          className="grid grid-cols-2 gap-4 items-center"
        >
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
          <button
            type="submit"
            className="col-span-2 p-2 hover:bg-gray-300 rounded-lg"
          >
            Login
          </button>
        </form>

        <Link to="/signup">
          <button className="p-2 px-40 hover:bg-gray-300 rounded-lg">
            Sign up
          </button>
        </Link>

        {loginStatusMessage && (
          <div>
            <h1 className="text-red-500">{loginStatusMessage}</h1>
          </div>
        )}
      </div>
      )
    </div>
  );
}

export default LoginView;
