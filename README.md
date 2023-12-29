# Sharetrip Interview Project

This project is a simple Node.js application that uses the [Express](https://expressjs.com/) framework.

## Prerequisites

Before you begin, ensure you have installed:

* [Docker](https://www.docker.com/products/docker-desktop)

## Running the Application with Docker

To run this application, follow these steps:

1. Clone this repository:

2. Navigate to the project directory and open a terminal window.


3. Build the Docker image:

```bash
docker build -t sharetrip-interview .
```
4. Run the Docker container:

```bash
docker run -p 3002:3002 sharetrip-interview
```

3. Open your browser to [http://localhost:3002](http://localhost:3002)