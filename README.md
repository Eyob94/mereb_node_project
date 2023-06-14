# Mereb_Node_Project

This project is a simple CRUD API built with Node.js and Express, and it can be easily set up using Docker Compose for containerization. It follows the MVC (Model-View-Controller) architecture and utilizes the singleton pattern for the database.

## Prerequisites

- Docker (latest version)
- Docker Compose (latest version)
- Node (v14) (not required if docker is used)

## Working Example

A working example of the project can be found at `https://52.91.186.141/person`

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Eyob94/mereb_node_project.git
```

2. Navigate to the project directory:

```bash
cd mereb_node_project
```

3. Start the application using Docker Compose:

```bash
docker-compose up --build -d
```

OR

```bash
node index.js
```

The API will be accessible at `http://localhost` or `https://localhost`(if you create an SSL certificate) if docker is used or at port 3000 if it isn't.

## API Endpoints

- GET `/person` - Retrieve all persons
- GET `/person/:personId` - Retrieve a specific person by ID
- POST `/person` - Create a new person
- PUT `/person/:personId` - Update a specific person by ID
- DELETE `/person/:personId` - Delete a specific person by ID

## Docker Compose Configuration

The `docker-compose.yml` file defines the services and dependencies for Docker Compose.
