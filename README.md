# Node Server

This project simulates a small server for a hotel package sales company.

![GitHub](https://img.shields.io/github/license/ThiagoDSMarcelino/node-server?color=blue)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ThiagoDSMarcelino/node-server)

## Building the Project

Before starting the server, you should run the following commands in the project's root directory:

```Bash

npm install # Install all Node.js module dependencies

npx prisma generate # Generate PrismaClient

```

## Routes

**User**

* Create [Post] http://localhost:8080/api/user/
* Login [Post] http://localhost:8080/api/user/login/
* Get All [Get] http://localhost:8080/api/user/
* Get by ID [Get] http://localhost:8080/api/user/id
* Delete [Delete] http://localhost:8080/api/user/

**Room**

* Create [Post] http://localhost:8080/api/room/
* Get All [Get] http://localhost:8080/api/room/
* Filters [Get] http://localhost:8080/api/room/filters/
* Get by ID [Post] http://localhost:8080/api/room/id
* Get All by Hotel [Post] http://localhost:8080/api/room/getByHotel/

**Hotel**

* Create [Post] http://localhost:8080/api/hotel/
* Get All [Get] http://localhost:8080/api/hotel/
* Get by ID [Post] http://localhost:8080/api/hotel/id
* Update [Put] http://localhost:8080/api/hotel/
* Delete [Delete] http://localhost:8080/api/hotel/
