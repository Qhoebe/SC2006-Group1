Project mission statement
- Develop a web application that assists drivers with their driving journey by providing directions to nearby carparks, car workshops and petrol stations.
- Also keeps track of their car expenses.
- Objective is to ensure driver’s car expenses are kept at a competitive amount.
- Supports LTA’s mission to enhance connectivity and improve travel experiences across the city


To run our project: 

1) Clone our repository at a chosen file directory.
2) Ensure that your system has node.js and added to the system PATH (to download node.js https://nodejs.org/en/download)
3) Open two terminal in the file directory where the git repository is cloned.
4) Our project uses a Client-Server architecture. This means that our client and server runs on two different port.
5) Our chosen port number for client is 3000 while server is 3001. Ensure that both port is not being used.

In the first terminal, run the following command:

    cd .\src\client\

In the second terminal, run the following command:

    cd .\src\server\src\

To install the require node_modules (if not installed), run the following command on both terminals: 

    npm install

Run the following command on the terminal in the server/src directory 

    npm run start

In the console, you should see the following message if the server is running without error

    Server running 
    Database connected. 

After connecting to the server, run the following commond on the terminal in the client directory

    npm run start

This should automatically open a browser and you are free to use our application!
