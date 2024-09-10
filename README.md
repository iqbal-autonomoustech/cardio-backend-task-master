# Cardio Backend Task
Description
This project is a backend application built with Node.js, Express, and Sequelize. It includes features such as fetching the best profession and best clients based on job payments. The application uses PostgreSQL as its database.

# Prerequisites
Docker and Docker Compose installed on your machine.
Setup
Cloning the Repository
To clone the repository and navigate into the project directory, run:


git clone https://github.com/iqbal-autonomoustech/cardio-backend-task-master.git
cd cardio-backend-task

install Docker 


`docker-compose up --build`

This command will build the Docker image for the application and start both the application and PostgreSQL database containers.

## Seed the Database

The database will be automatically seeded when the Docker container is built due to the npm run seed command in the Dockerfile. If you need to seed the database manually, run:

`docker-compose run app npm run seed`,
Accessing the Application

The application will be accessible at http://localhost:3001. You can use this URL to interact with the endpoints defined in your Express application.