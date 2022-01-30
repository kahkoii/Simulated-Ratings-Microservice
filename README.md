# ETI ASSIGNMENT 2

![NodeJS Server CI](https://github.com/kahkoii/ETI-Assignment2/actions/workflows/CI.yaml/badge.svg)

## Description

This assignment splits up a monolith project into several parts, to demonstrate microservices and REST APIs in action. The section I am working on is **3.9. Rating and Comments Dashboard for Students**. For this project, my technology stack includes using [NodeJS](https://nodejs.org/en/about/) and [Express](https://expressjs.com/) for my API server, [SQLite](https://www.sqlite.org/index.html) for the database (specifically the [npm implementation](https://www.npmjs.com/package/sqlite3) of it), and the [React](https://reactjs.org/) framework with the [chakra-ui](https://chakra-ui.com/) component library for frontend.

![image](https://user-images.githubusercontent.com/33172738/151199345-87b313e7-39df-4e87-8e68-ac16c855d69d.png)

**For an in-depth documentation of the API, please refer to the [API Reference](API_Reference.md).**

The task breakdown for this assignment is as follows:

- 3.9.1. Create, view, update ratings and comments to students, tutors, modules, classes

- 3.9.2. View ratings and comments received

- 3.9.3. List ratings and comments received (anonymized)

- 3.9.4. List ratings and comments given

## Deployment Instructions

### Windows Systems

Download and Run Containers

```txt
.\deploy_scripts\windows.bat up
```

Stop Containers

```txt
.\deploy_scripts\windows.bat down
```

### Linux-based Systems

```sh
# Download and Run Containers
./deploy_scripts/linux.sh up

# Stop Containers
./deploy_scripts/linux.sh down
```

## CI/CD Workflow Actions

### ESLint Test

On push to the main branch, code will be tested to ensure that it passes the ESLint linting standards.

### Mocha API Testing

On push to the main branch, the main API server code will be tested using the test scripts in the [test](./test) directory. These tests cover all the endpoints of the API, and the workflow only passes if all these tests pass. On the top of the README, a live tracker of the CI pass status is displayed for quick monitoring.

### Docker Hub Deployment

Whenever a tag with a 'v' in front is pushed to origin, the code for the frontend server and API server will be built using the various Dockerfiles specified, and the latest version of the image will be uploaded to Docker Hub, making the process of deployment easier.
