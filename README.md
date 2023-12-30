# Sharetrip Interview Project

This project is a robust Node.js application built with the [Express](https://expressjs.com/) framework. It uses [MongoDB](https://www.mongodb.com/) as the database, [Mongoose](https://mongoosejs.com/) as the ODM, and [Jest](https://jestjs.io/) for testing. The application supports containerization with [Docker](https://www.docker.com/). The project structure adheres to the principles of `Clean Architecture`, as outlined in [this blog post](https://paulallies.medium.com/clean-architecture-typescript-express-api-b90846794998).

The application provides a comprehensive REST API that allows users to search for keywords in blog posts from an [external API](https://jsonplaceholder.typicode.com/posts). When a user makes a search request, the application fetches all posts from the external API, searches the titles and bodies of the posts for the keyword, and stores any matching posts and the user's search action in separate collections in the database. The search results are then returned to the user.

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Application with Docker](#running-the-application-with-docker)

## Getting Started

To get the project up and running, follow these steps:

1. **Clone the repository.**

2. **Navigate to the project directory and open a terminal window.**

3. **Install the dependencies:**
    ```bash
    npm install
    ```

4. **Create a `.env` file in the root of the project with the following variables:**
    ```bash
    PORT=3002 # optional
    MONGODB_URI=[your mongo uri]
    TEST_MONGODB_URI=[your test mongo uri] # optional
    ```
    > **Note:** If you don't have a MongoDB URI, you can create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and use the connection string provided. Alternatively, use a local MongoDB instance by replacing `[your mongo uri]` with `mongodb://localhost:27017/sharetrip-interview`. If you don't have a test MongoDB URI, you can use the same URI as your development URI. If you don't provide a PORT, the application will run on port 3002. If you don't provide a TEST_MONGO_URI, the application will use the same URI as your development URI for testing.

5. **Build the application:**
    ```bash
    npm run dev:build
    ```

6. **Start the application:**
    ```bash
    npm run dev:serve
    ```
    > **Note:** You can also run the application in production mode by running `npm run dev` instead of steps 5 and 6.

7. **Access the application at [http://localhost:3002](http://localhost:3002).**

## Running the Application with Docker

### Prerequisites

Ensure you have installed:

- [Docker](https://www.docker.com/products/docker-desktop)

To run the application with Docker, follow these steps:

1. **Clone this repository.**

2. **Navigate to the project directory and open a terminal window.**

3. **Build the Docker image:**
    ```bash
    docker build -t sharetrip-interview .
    ```

4. **Run the Docker container:**
    ```bash
    docker run -p 3002:3002 sharetrip-interview
    ```

5. **Access the application at [http://localhost:3002](http://localhost:3002).**