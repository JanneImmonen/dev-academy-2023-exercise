# Dev Academy 2023 Exercise

This is a project submission for Dev Academy 2023. The application is a web app that displays information about bike sharing stations and their journey data.

## Technologies

- Backend: Node.js, Express, PostgreSQL, TypeScript
- Frontend: React
- Source Code: https://github.com/JanneImmonen/dev-academy-2023-exercise

## Setup

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

## Application Components

### Backend

Express server for handling API requests
PostgreSQL database for storing station and journey data
importData.ts script for importing station and journey data into the database

### Frontend

React application with the following components:
StationList: Displays a list of stations
JourneyList: Displays a list of journeys based on a specific station ID
Search: Allows users to search for journeys by station ID
StationDetails: Displays detailed information about a station

## Authors

[Janne Immonen] - [https://github.com/JanneImmonen]

## License

This project is licensed under the [https://opensource.org/license/mit/] License - see the [LICENSE.md](LICENSE.md) file for details
