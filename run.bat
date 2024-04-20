@ECHO OFF


CD src/server
START cmd /c "npm install && npm run dev"

CD ../client
START cmd /c "npm install && npm run start"

EXIT