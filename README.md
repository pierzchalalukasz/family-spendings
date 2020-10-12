# FamilySpendings BACKEND

## Initial setup

- necessary components & software: NodeJS, MongoDB


### How to run project

Before running the project, ensure MongoDB is running.

- how to run the first time
  - `npm install`
  - `npm start`
- how to run it on subsequent runs
  - `npm start`

### How to configure the project

- list of environment variables and their purpose
  - DB_CONNECTION_STRING - MongoDB connection string
  - TOKEN_SECRET - Secret used in JWT methods
  - PORT - Port the server app listens on

### How to use the project

  - method: `GET`  
    path: `/user/current`  
    response: 
    ```
    {
      "user": {
        "_id": "5f82f38c917e3e40509a9d2b",
        "name": "SampleUser",
        "email": "sampleuser@gmail.com",
        "isAdmin": true,
        "familyId": "5f82f38b917e3e40509a9d2a"
      }
    }
    ```

    method: `POST`  
    path: `/user`  
    body:
      ```
      {
        "name": "SampleUser",
        "email": "sampleuser@gmail.com",
        "isAdmin": true,
        "familyName": "Smith"
        "password": samplepass,
        "confirmPassword": samplepass
      }

      or

      {
        "name": "SampleUser",
        "email": "sampleuser@gmail.com",
        "isAdmin": false,
        "familyId": "5f82f38b917e3e40509a9d2a"
        "password": samplepass,
        "confirmPassword": samplepass
      }     
      ```
    response:
      ```
      {
        "_id": "5f84d3b856287c4254a8f621",
        "isAdmin": true,
        "email": "sampleuser@gmail.com",
        "name": "SampleUser",
        "familyId": "5f82f38b917e3e40509a9d2a"    
      }
      ```

    method: `POST`  
    path: `/user/auth`  
    body:
    ```
    {
      "email": "sampleuser@gmail.com",
      "password": "samplepass"
    }
    ```
    response:
    ```
    {
      "user": {
        "_id": "5f82f38c917e3e40509a9d2b",
        "name": "SampleUser",
        "email": "sampleuser@gmail.com",
        "isAdmin": true,
        "familyId": "5f82f38b917e3e40509a9d2a"
      },
      "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjgyZjM4YzkxN2UzZTQwNTA5YTlkMmIiLCJpYXQiOjE2MDI1Mzg5Mjl9.V_UKgSULPMyK0Jf5nlhZmHYtRlkccC4EVf..."
    }
    ```

    method: `GET`  
    path: `/family/:id`  
    params:
    ```
    {
      "id": "5f82f38b917e3e40509a9d2a"
    }
    ```
    response:
    ```
    {
      "_id": "5f82f38b917e3e40509a9d2a"
      "name": "Smith"
      "budget": 1250
    }
    ```
  
    method: `GET`  
    path: `/family/:id/budget`  
    params:
    ```
    {
      "id": "5f82f38b917e3e40509a9d2a"
    }
    ```
    response
    ```
    {
      "budget": 1250
    }
    ```
  
    method: `PUT`  
    path: `/family/:_id/spending`  
    params:
    ```
    {
      "_id": "5f82f38b917e3e40509a9d2a"
    }
    ```
    body:
    ```
    {
      "spentAmount": 250
    }
    ```  
    response:  
    ```
    200
    ```  
    method: `PUT`  
    path: `/family/:_id/fund`  
    params:
    ```
    {
      "_id": "5f82f38b917e3e40509a9d2a"
    }
    ```
    body:
    ```
    {
      "newFund": 1250
    }
    ```
    response:
    ```
    200
    ```

### How to run tests locally

  - `npm test`

## Environments

The app is deployed at https://family-spendings.azurewebsites.net/

