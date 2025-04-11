# OpenTrader README

## Overview

OpenTrader is a web application designed for managing trades and providing a user-friendly interface for traders. The application is built using Angular for the frontend and .NET Core for the backend.

## Getting Started

### Prerequisites

* Node.js (version 22 or later)
* .NET Core SDK (version 8.0 or later)
* Docker

### Building and Running the Application

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to build the Docker image:
```
docker build -t open-trader .
```
4. Run the following command to start the container:
```
docker run -p 8080:8080 -v /path/to/host/data:/app/data open-trader
```
5. Open a web browser and navigate to `http://localhost:8080` to access the application.

## Project Structure

* `ClientApp`: Angular frontend application
* `WebAPI`: .NET Core backend API
* `Dockerfile`: Dockerfile for building and running the application

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

This project is licensed under the GNU General Public License v3.0. See the `LICENSE` file for more information.

## Acknowledgments

* Angular CLI
* .NET Core
* Docker
