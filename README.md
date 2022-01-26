# ETI ASSIGNMENT 2

![NodeJS Server CI](https://github.com/kahkoii/ETI-Assignment2/actions/workflows/CI.yaml/badge.svg)

## Description

This assignment splits up a monolith project into several parts, to demonstrate microservices and REST APIs in action. The section I am working on is **3.9. Rating and Comments Dashboard for Students**. For this project, my technology stack includes using [NodeJS](https://nodejs.org/en/about/) and [Express](https://expressjs.com/) for my API server, [SQLite](https://www.sqlite.org/index.html) for the database (specifically the [npm implementation](https://www.npmjs.com/package/sqlite3) of it), and the [React](https://reactjs.org/) framework with the [chakra-ui](https://chakra-ui.com/) component library for frontend.

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
