# Dev Academy 2023 Exercise

This is a project submission for Dev Academy 2023. The application is a web app that displays information about bike sharing stations and their journey data.

## Technologies

- Backend: Node.js, Express, PostgreSQL, TypeScript
- Frontend: React
- Source Code: https://github.com/JanneImmonen/dev-academy-2023-exercise

## Setup

### PostgreSQL Setup

Before you can run the application, you need to set up a PostgreSQL database and user. Follow these steps to set up PostgreSQL for this application:

1. Install PostgreSQL on your system, if you haven't already. You can download the installer from the official PostgreSQL website: https://www.postgresql.org/download/

2. After installation, open the psql command line tool (on Windows, you can search for "pgAdmin" or "psql" in the Start menu).

3. Create a new database and user for the application:

CREATE DATABASE mydb;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

Replace mydb, myuser, and mypassword with your desired database name, username, and password, respectively.

4. Now that you have created the database and user, update the .env files in both the backend and frontend folders with the necessary information. The .env files should contain the following variables:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
DB_USER=myuser
DB_PASSWORD=mypassword

Replace mydb, myuser, and mypassword with the database name, username, and password you chose earlier.

5. With the database set up, you can now run the importData.ts script in the backend/src folder to import station and journey data into the database:

cd backend/src
ts-node importData.ts

If you encounter any issues running the script, try running it with the following command:

powershell -ExecutionPolicy Bypass -Command "ts-node importData.ts"

### Backend

1. Run the following command to install the required dependencies: npm install

2. Set up your environment variables in a `.env` file in the root folder of your project. You can use the `.env.example` as a reference.

3. Start the backend server by running: npm start

If you encounter any issues, you can also use this command: powershell -ExecutionPolicy Bypass -Command "ts-node src/index.ts"

### Frontend

1. Change to the frontend folder and install the required dependencies:

cd frontend
npm install

2. Set up your environment variables in a `.env` file in the frontend folder. You can use the `.env.example` as a reference.

3. Start the frontend server by running: npm start

The frontend will be running at `localhost:3001`.

## Tests

The project includes tests for both the Journey Controller and Station Controller using `supertest`. To run the tests, simply run the following command in the root folder of your project: npm test

## Repository Structure

The main files and folders in this project are:

- `backend/src/`: The source code for the backend server
- `frontend/src/`: The source code for the frontend React application
- `backend/src/importData.ts`: A script to import station and journey data into the database
- `frontend/src/App.tsx`: The main entry point for the React application, which includes routing and component rendering
- `frontend/src/components/`: Contains the various React components used in the application

CSS files for styling the frontend are also included.

### .csv files

Three csv-files are too big, so you can download them from the links found in the files so that you can test your own project, if you want to clone this to your repository.

## Application Components

### Backend

-Express server for handling API requests
-PostgreSQL database for storing station and journey data
-importData.ts script for importing station and journey data into the database

### Frontend

-React application with the following components:
-StationList: Displays a list of stations
-JourneyList: Displays a list of journeys based on a specific station ID
-Search: Allows users to search for journeys by station ID
-StationDetails: Displays detailed information about a station

## Authors

[Janne Immonen](https://github.com/JanneImmonen)

## License

This project is licensed under the [MIT](https://opensource.org/license/mit/) License
